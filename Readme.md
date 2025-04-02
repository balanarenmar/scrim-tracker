# Scrim Tracker

This project is built using **Google Apps Script** and managed locally with **VS Code** using `clasp` (Command Line Apps Script). It includes HTML, JavaScript, and Stylesheets for a web-based interface.

## 🚀 Setup Instructions

### **1️⃣ Prerequisites**
- Install [Node.js](https://nodejs.org/)
- Install `clasp` globally:
  ```sh
  npm install -g @google/clasp
  ```
- Authenticate with your Google account:
  ```sh
  clasp login
  ```

### **2️⃣ Clone the Repository**
```sh
git clone <your-repo-url>
cd scrim-tracker
```

### **3️⃣ Link to Google Apps Script Project**
- Create a new Google Apps Script project at [script.google.com](https://script.google.com/)
- Enable **Apps Script API** in Project Settings
- Get the **Script ID** from `Project Properties`
- Link the local folder to the script:
  ```sh
  clasp clone <SCRIPT_ID>
  ```

### **4️⃣ Develop Locally in VS Code**
- Edit `Code.js` and `.html` files in VS Code
- To preview the web app, use `doGet()`:
  ```javascript
  function doGet() {
      return HtmlService.createHtmlOutputFromFile('index');
  }
  ```

### **5️⃣ Deploy the App**
```sh
clasp push
```
- Go to [script.google.com](https://script.google.com/home/projects)
- Click **Deploy** → **New Deployment**
- Choose **Web App** and set access permissions

### **6️⃣ Run the Web App**
After deployment, visit the provided URL to see your web app in action.

## 📁 Folder Structure
```
SCRIM-TRACKER/
│-- .clasp.json     # Ignored in Git
│-- appsscript.json # Apps Script project settings
│-- Code.js         # Main backend script
│-- index.html      # Main UI page
│-- JavaScript.html # Additional JS code
│-- Stylesheet.html # Custom CSS
│-- test.html       # Test page
```

## 🛠️ Git Ignore `.clasp.json`
To prevent `.clasp.json` from being committed:
```sh
echo ".clasp.json" >> .gitignore
```
Then commit the changes:
```sh
git add .gitignore
git commit -m "Ignore clasp.json"
```

## ✅ Done!
Now you can collaborate and manage your Apps Script project through Git! 🚀

