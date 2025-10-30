# ============================================
# 🧭 Travel Package Recommendation App (Cleaned)
# ============================================

# import streamlit as st
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import OneHotEncoder, MinMaxScaler

from frontend.node_modules.flatted.python.flatted import parse

app = Flask(__name__)
CORS(app)


@app.route("/api/recommend", methods=["POST"])
def recommend():
    try:
        # ✅ Parse incoming JSON safely
        data = request.get_json()
        if not data:
            raise ValueError("No JSON data received")

        print("📩 Received data:", data)

        # ✅ Extract required fields
        from_city = data.get("fromCity")
        to_city = data.get("toCity")
        budget = data.get("budget")
        duration = data.get("duration")
        package_type = data.get("type")

        # ✅ Basic validation
        if not all([from_city, to_city, budget, duration, package_type]):
            raise ValueError("Missing one or more required fields")

        # -------------------------------
        # 1️⃣ Load Data
        # -------------------------------
        # @st.cache_data
        def load_data():
            df = pd.read_csv("packagedata_with_id.csv")  # update with your file name
            return df

        df = load_data()
    # st.success(f"✅ Loaded CSV with {df.shape[0]} rows and {df.shape[1]} columns.")

    # st.header("🧳 Travel Package Recommendation System")

    # -------------------------------
    # 2️⃣ User Inputs
    # -------------------------------
        from_city = from_city
        destination = to_city
        destination_type = package_type
        trip_duration = duration
        budget = budget
    # -------------------------------
    # 3️⃣ Feature Preparation
    # -------------------------------
        features = ["From_City", "Destination", "Destination_Type"]
        num_features = ["Trip_Duration_Days", "Budget"]
    
        df_features = df.copy()
    
    # Encode categorical
        ohe = OneHotEncoder(handle_unknown="ignore")
        encoded_cats = ohe.fit_transform(df_features[features]).toarray()
        encoded_cats_df = pd.DataFrame(encoded_cats, columns=ohe.get_feature_names_out(features))
    
    # Normalize numerical
        scaler = MinMaxScaler()
        scaled_nums = scaler.fit_transform(df_features[num_features])
        scaled_nums_df = pd.DataFrame(scaled_nums, columns=num_features)
    
    # Combine features
        X = np.hstack([encoded_cats_df, scaled_nums_df])
    
    # -------------------------------
    # 4️⃣ Prepare User Input Vector
    # -------------------------------
        user_df = pd.DataFrame({
            "From_City": [from_city],
            "Destination": [destination],
            "Destination_Type": [destination_type],
            "Trip_Duration_Days": [trip_duration],
            "Budget": [budget]
        })

        user_encoded = ohe.transform(user_df[features]).toarray()
        user_scaled = scaler.transform(user_df[num_features])
        user_vector = np.hstack([user_encoded, user_scaled])

    # -------------------------------
    # 5️⃣ Nearest Neighbors Model
    # -------------------------------
        model = NearestNeighbors(n_neighbors=5, metric='cosine')
        model.fit(X)
        distances, indices = model.kneighbors(user_vector)

    # -------------------------------
    # 6️⃣ Get Recommendations
    # -------------------------------
        recommended_trips = df.iloc[indices[0]].copy().reset_index(drop=True)  # ✅ remove old index
        recommended_trips["Similarity"] = (1 - distances[0]).round(6)

    # Remove any duplicate columns (safety check)
        recommended_trips = recommended_trips.loc[:, ~recommended_trips.columns.duplicated()]
        recommended_trips.columns = recommended_trips.columns.str.strip()

    # Columns to display
        columns_to_show = [
            'Package_Id', 'Package_Type', 'From_City', 'Destination', 'Destination_Type',
            'Trip_Duration_Days', 'Budget', 'Accommodation', 'Transport_Mode',
            'Activities_Count', 'Season', 'Similarity'
        ]
        available_columns = [col for col in columns_to_show if col in recommended_trips.columns]
        print(recommended_trips[available_columns])
        result = recommended_trips[available_columns].to_dict(orient="records")
        # ✅ Return success response
        return jsonify({
            "status": "success",
            "message": "Recommendations generated successfully",
            "recommendations": result
        }), 200
    except ValueError as ve:
        # 🔶 Known / validation errors
        return jsonify({"status": "error", "message": str(ve)}), 400

    except Exception as e:
        # 🔴 Unknown / server-side errors
        print("❌ Server error:", e)
        return (
            jsonify(
                {
                    "status": "error",
                    "message": "Internal Server Error. Please try again later.",
                }
            ),
            500,
        )

# -------------------------------
# 7️⃣ Display in Streamlit
# -------------------------------
# st.subheader("🔹 Recommended Similar Trips:")
#
# if not available_columns:
#     st.error("⚠ No valid columns available to display. Please check your dataset headers.")
# else:
#     st.dataframe(recommended_trips[available_columns])

if __name__ == "__main__":
    app.run(debug=True)
