## ✅ Fix Report: Canvas Interactivity Improvement

This report details the resolution of a critical performance issue.

### 📌 **Issue & Context**

* This snippet resolves the interactibity issue in 01-render-shape.
* The goal in that snippet was to render 10 million react in canvas. By default, operations in canvas are **render-blocking** and occupy the **main-thread**, which results in poor input interactivity and increasing TTI performance metric. 

### 🛠️ **Solution**

* To address this issue I have used the combination of **rendering batching** and **`requestAnimationFrame` (rAF)**. rAF is designed to schadule tasks before the browsers next repaint.

### 📈 **Result Summary**

| Metric | Outcome | Details |
| :--- | :--- | :--- |
| **Interactivity** | **Lots of improvement** | Now the input is interactive while the canvas shapes are rendering. |
| **Time-To-Interactive (TTI)** | **Decreased** | This metric has decreased, indicating that the app is interactive much sooner. |
| **Total rendering time** | **Consistent** | As you see in the below the times has not changed much and are consistent with previous results. We have successfully shifted the blocking canvas operation to non-blocking, but rendering 10 million shapes still requires a lot of computation and time. |

### **Measured Total Render Times**

| Run | Duration (ms) |
| :--- | :--- |
| 1 | $5,581.9921875$ |
| 2 | $7,104.467041015625$ |
| 3 | $6,882.1298828125$ |

---

> **Notice:** The formatting and structure of this report were created using Gemini, while the technical content remains the original text provided by the author.