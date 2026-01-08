from flask import Blueprint, request, jsonify, send_from_directory
import pandas as pd
import numpy as np
import os
from .schema_detector import detect_schema
from .dashboard_config import get_dashboard_config

data_clean = Blueprint("data_clean", __name__)

UPLOAD_FOLDER = "uploads"
CLEAN_FOLDER = "cleaned"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(CLEAN_FOLDER, exist_ok=True)


@data_clean.route("/upload-clean", methods=["POST"])
def upload_and_clean():

    # -----------------------------
    # 1. File upload
    # -----------------------------
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    # -----------------------------
    # 2. Read file
    # -----------------------------
    try:
        if file.filename.endswith(".csv"):
            df = pd.read_csv(filepath)
        elif file.filename.endswith((".xls", ".xlsx")):
            df = pd.read_excel(filepath)
        else:
            return jsonify({"error": "Unsupported file format"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    # -----------------------------
    # 3. BASIC CLEANING
    # -----------------------------

    # Remove duplicates
    df = df.drop_duplicates()

    # Remove fully empty rows
    df = df.dropna(how="all")

    # Standardize column names
    df.columns = (
        df.columns
        .str.lower()
        .str.strip()
        .str.replace(" ", "_")
    )

    # -----------------------------
    # 4. DATE HANDLING (FIXED)
    # -----------------------------
    date_columns = []

    for col in df.columns:
        if any(keyword in col for keyword in ["date", "time", "dob", "founded"]):
            df[col] = pd.to_datetime(df[col], errors="coerce")
            date_columns.append(col)

    # -----------------------------
    # 5. NUMERIC HANDLING (SAFE)
    # -----------------------------
    for col in df.columns:
        if col not in date_columns:
            df[col] = pd.to_numeric(df[col], errors="ignore")

    numeric_cols = df.select_dtypes(include=np.number).columns

    # Fill missing numeric values with median
    df[numeric_cols] = df[numeric_cols].fillna(df[numeric_cols].median())

    # -----------------------------
    # 6. HANDLE OUTLIERS (CLIP)
    # -----------------------------
    for col in numeric_cols:
        Q1 = df[col].quantile(0.25)
        Q3 = df[col].quantile(0.75)
        IQR = Q3 - Q1

        lower = Q1 - 1.5 * IQR
        upper = Q3 + 1.5 * IQR

        df[col] = np.clip(df[col], lower, upper)

    # -----------------------------
    # 7. FORMAT DATE COLUMNS (CRITICAL)
    # -----------------------------
    for col in date_columns:
        df[col] = df[col].dt.strftime("%Y-%m-%d")

    # -----------------------------
    # 8. SAVE CLEANED FILE (FIXED)
    # -----------------------------
    clean_filename = "cleaned_data.xlsx"
    clean_path = os.path.join(CLEAN_FOLDER, clean_filename)

    with pd.ExcelWriter(
        clean_path,
        engine="xlsxwriter",
        datetime_format="yyyy-mm-dd"
    ) as writer:

        df.to_excel(writer, index=False, sheet_name="Cleaned Data")
        worksheet = writer.sheets["Cleaned Data"]

        # Auto-adjust column width (prevents ########)
        for i, col in enumerate(df.columns):
            max_len = max(
                df[col].astype(str).map(len).max(),
                len(col)
            )
            worksheet.set_column(i, i, max_len + 3)

    # -----------------------------
    # 9. SCHEMA & DASHBOARD
    # -----------------------------
    schema_type = detect_schema(df.columns)
    dashboard_config = get_dashboard_config(schema_type)

    # -----------------------------
    # 10. RESPONSE
    # -----------------------------
    return jsonify({
        "message": "File cleaned successfully",
        "schema": schema_type,
        "rows": len(df),
        "columns": df.columns.tolist(),
        "dashboard": dashboard_config,
        "download_url": f"/cleaned/{clean_filename}"
    })


# -----------------------------
# DOWNLOAD ROUTE
# -----------------------------
@data_clean.route("/cleaned/<filename>")
def download_cleaned_file(filename):
    return send_from_directory(
        CLEAN_FOLDER,
        filename,
        as_attachment=True
    )
