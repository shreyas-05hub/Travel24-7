# 🧭 Travel Cost & Package Recommender System – *Marghadharshi*

An AI-powered recommendation system that suggests the **Top 5 personalized travel packages** based on user preferences such as departure city, destination type, trip duration, and budget.  
This project integrates **Machine Learning (KNN with Cosine Similarity)**, **Streamlit**, and **Power BI** to deliver smart, data-driven travel recommendations.

---

## 📌 Project Overview

**Goal:**  
Build an end-to-end intelligent recommender that analyzes user inputs and returns the most relevant travel packages from a dataset of **22 K+ real-world records**.

**Key Inputs:**  
From City | Destination | Destination Type | Trip Duration | Budget  

**Outputs:**  
Top 5 similar packages with details like cost, duration, accommodation, and type.

**Tech Stack**
| Component | Description |
|------------|-------------|
| **Language** | Python |
| **Libraries** | pandas · numpy · scikit-learn · streamlit |
| **Visualization** | Power BI |
| **Frontend (Full Stack)** | React · Vite · Bootstrap |
| **Backend (Full Stack)** | Flask · Render |
| **Deployment** | Streamlit · GitHub · Vercel |

---

## 📊 Data Collection

- **Dataset:** Open-source travel dataset with **22,342 records** and **11 features**  
- **Features:**  
  `Package_ID`, `From_City`, `Destination`, `Destination_Type`, `Trip_Duration_Days`, `Budget`, `Accommodation_Type`, `Transport_Mode`, `Activities_Count`, `Season`, `Package_Type`

**Objective:**  
Prepare structured, high-quality data for an ML-based recommender system.

---

## 🧹 Data Validation & Cleaning

✔ Checked column data types and unique values  
✔ Removed duplicates and special characters  
✔ Standardized categorical text (lowercase)  
✔ Verified numeric ranges (duration, budget)  
✔ Handled outliers in `Budget` using percentile capping (5th–95th)

**Outcome:**  
A clean, validated dataset ready for analysis and modeling.

---

## 🔍 Exploratory Data Analysis (EDA)

**Univariate Analysis**
- Numeric: `Budget`, `Trip_Duration_Days`, `Activities_Count`
- Categorical: `Destination_Type`, `Package_Type`, `Season`

**Bivariate Analysis**
- `Trip_Duration_Days vs Budget` → Longer trips → higher cost  
- `Destination_Type vs Season` → Beaches popular in winter, hills in summer  
- `Budget vs Package_Type` → Luxury > Premium > Standard  

Visualizations created using **Matplotlib, Seaborn, Plotly**.

---

## 💡 Key Insights

🌴 Most Popular Destinations: **Goa, Delhi, Jaipur**  
💰 Average Trip Cost: **₹ 49 K**  
🕒 Common Duration: **4–6 days**  
❄️ Highest Bookings: **Winter Season**  
🏨 High Spenders: **Luxury Packages**

---

## 📈 Power BI Dashboard

Interactive dashboard built to visualize insights such as:

- Destination popularity  
- Budget vs Duration trends  
- Season-wise booking distribution  
- Package-type spending  

**Dashboard Preview:**  
![Power BI Dashboard](Screenshot%202025-11-02%20143153.png)

---

## 🧠 Data Preprocessing & Feature Engineering

- **Categorical Encoding:** `OneHotEncoder`  
- **Numeric Scaling:** `MinMaxScaler`  
- **Feature Selection:**  
  `Destination_Type`, `Trip_Duration_Days`, `Budget`, `Accommodation_Type`, `Transport_Mode`, `Season`, `Package_Type`
- **Weight Assignment:**  
  `Destination_Type (0.4)`, `Budget (0.25)`, `Duration (0.2)`, others (0.15)

---

## 🤖 Model Development – Cosine Similarity

**Algorithm:** K-Nearest Neighbors (KNN) with Cosine Similarity  

**Process:**
1. Convert user input → feature vector  
2. Compute cosine similarity with all records  
3. Retrieve Top 5 packages with highest similarity  

**Sample Code Snippet:**
```python
from sklearn.preprocessing import OneHotEncoder, MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

def recommend_packages(from_city, destination, destination_type, duration, budget, top_n=5):
    user_df = pd.DataFrame({
        'From_City': [from_city],
        'Destination': [destination],
        'Destination_Type': [destination_type],
        'Trip_Duration_Days': [duration],
        'Budget': [budget]
    })
    # preprocess → encode → scale → compute similarity
    similarity = cosine_similarity(user_vector, dataset_vectors)
    top_indices = similarity[0].argsort()[-top_n:][::-1]
    return df.iloc[top_indices][['Destination','Package_Type','Budget','Trip_Duration_Days']]
⚙️ Real-Time Implementation

Deployed via Streamlit, allowing users to:

1️⃣ Select preferences (From City, Destination, Type, Duration, Budget)
2️⃣ Get Top 5 Recommended Packages with Similarity Scores
3️⃣ View details like Accommodation, Season, Transport Mode

🌐 Streamlit & Git Integration

Streamlit App for real-time interaction

GitHub repository for code versioning

https://travel-tgxss3l8boweq5cxf8tmdy.streamlit.app/

🚀 Future Enhancements

🚗 Integrate Google Maps API to display trip locations
⭐ Add user ratings and reviews
🧮 Adopt Deep Learning (Collaborative Filtering)
🎯 Add advanced filters by season or budget range
📊 Extend Power BI dashboard for real-time user analytics

👥 Contributors
Role	Members
Data Science Team	Anitha Sirigireddy · Naveen Kumar Reddy Bapathi · Ganesh Sura
Full Stack Team	Shreyas Kandekar · Rajoli Srinivas · Malli Prudhvi

    
