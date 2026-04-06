# Zorvyn_Finance_UI_Assignment
PinkFinance  is a high-fidelity frontend financial dashboard designed to help users track, analyze, and manage personal finances with clarity and ease. 

 PinkFinance :Professional Financial Dashboard (Frontend Project) 
Overview 
PinkFinance  is a high-fidelity frontend financial dashboard designed to help users track, analyze, and manage personal finances with clarity and ease. 

The application focuses on: 
Visual analytics 
Role-based interaction 
Smooth user experience 
Data portability 
It is built entirely using Vanilla JavaScript, ensuring high performance with minimal dependencies. 

Key Features 
Dashboard & Analytics 
Summary cards for Income, Expense, and Balance 
Interactive Line Chart (daily financial trends) 
Doughnut Chart (Income vs Expense ratio) 
Monthly financial tracking for pattern analysis 
 Transactions Management 
Add, view, and delete transactions 
Table with: 
Date 
Item 
Type (Income/Expense) 
Amount 
Real-time Search & Monthly Filtering 

Role-Based Access Control (RBAC) 
Admin Mode 
Full CRUD operations (Add/Delete) 
Viewer Mode 
Read-only access 
UI dynamically adapts based on selected role

Insights Engine 
Real-time Insight Cards 
Automatic calculation of: 
Savings 
Spending patterns 
Helps users understand financial behavior instantly 

 State Management 
Centralized state object 
Manages: 
Transactions 
User role 
Filters (search/month) 
Enables efficient and predictable UI updates 

UI/UX & Design 
Aesthetic Design 
Clean Pink-themed UI 
Responsive and minimal layout 
Handles empty states gracefully 

 Dark Mode 
Fully implemented theme toggle 
Smooth switching using CSS variables 

Motion & Micro-interactions 
Smooth theme transitions  
Collapsible sidebar with fluid animation 

Button hover effects: 
Scale  
Subtle motion feedback 
Modal popIn animation for better focus 

Data Export 
Export filtered data into: 
CSV 
JSON 
Useful for reporting and external analysis 

 Technical Architecture 
Approach 
Modular Monolith Design 

Built with: 
HTML 
CSS (Variables, Flexbox/Grid) 
Vanilla JavaScript 

 State-Driven UI 
UI updates are triggered by state changes 

Ensures: 
Consistency 
Performance 
Maintainability 

 Data Visualization 
Uses Chart.js for rendering charts 
Implements proper lifecycle management: 
destroy() before re-render 

RBAC Simulation 
"Gatekeeper Logic" checks state.role 

Dynamically controls: 
Button visibility 
User permissions 
Edge Case Handling 
Dynamic Index Mapping 
Ensures correct deletion during filtering/search 
Empty State Handling 
UI remains stable with no data 
Currency Handling 
Uses toFixed(2) for accuracy 
Built-in helper for conversion (no API dependency) 

How to Verify (Manual Testing) 
Follow these steps to test the application: 
Switch Role 
Change to Admin → Add/Delete buttons appear 
Change to Viewer → Buttons disappear 
Add Transactions 

Verify updates in: 
Table 
Charts 
Summary cards 
Apply Filters 
Use search + monthly filter 
Confirm correct results 
Delete Records 
Ensure correct item is removed (even during filtering) 
Toggle Dark Mode 
Check smooth UI transition 
Export Data 
Download CSV/JSON and verify content 

Setup Instructions 
Clone or Download Project 
Ensure the following files are in the same directory: 
index.html 
z.css 
app.js 

Dependencies 
Internet connection required for: 
Chart.js (CDN) 
FontAwesome (icons) 
Run Application 
Open index.html in any modern browser 

Scalability & Future Scope 
This project is designed to be API-ready: 
getProcessedData() → can fetch from backend 
saveRecord() → can use async API calls 

Developer Notes 
Currency helper uses a fixed-rate lookup system 
Simulates real-world finance tools without API complexity 
Focus was placed equally on: 
Functionality (Logic) 
Feel (User Experience) 

GitHub Live Demo Link: https://noonqi.github.io/Zorvyn_Finance_UI_Assignment/ 

GitHub Link for Source Code:NoonQi/Zorvyn_Finance_UI_Assignment: PinkFinance is a high-fidelity frontend financial dashboard designed to help users track, analyze, and manage personal finances with clarity and ease. 

 
 

 

 
