# Quilt-Design

## Overview
Quilt Design is a TypeScript application that generates and displays customizable quilt patterns programmatically. It models quilts as a 2D grids of squares with configurable patterns, colors, and orientations. The project emphasizes clear abstraction of quilt components and recursive pattern generation. 

## Features
- **Pattern Generation:** Supports multiple distinct quilt patterns implemented with recursion for scalability
- **Customizable Attributes:** Shapes, colors, and orientations are created to have diverse visual designs.
- **Interactive Preview:** View generated quilt patterns dynamically in a browser environment

## How to run 
1. **Clone the Repository**
   ```bash
   git clone https://github.com/laurxntra/Quilt-Design.git
   cd Quilt-Design
   ```
2. **Install Dependencies**
   ```
   npm install --no-audit
   ```
3. **Start the Application**
   Launch the app locally with:
   ```
   npm run start
   ```
4. **Open in Browser**
   - http://localhost:8080
5. **Customize Quilt**
   You can customize the quilt by modifying the URL query parameters:
   - `pattern`: Select a quilt pattern (`A`, `B`, `C`, `D`, or `E`)
   - `color`: Choose a color (`green` by default, or `red`)
   - `rows`: Specify the number of rows as a positive integer
   
   - Example: To display pattern C in red with 8 rows, use: http://localhost:8080/?pattern=C&color=red&rows=8
  
## Project Structure
| File/Folder          | Description                                                |
|---------------------|------------------------------------------------------------|
| `patterns.ts`        | Implements quilt pattern functions. |
| `patterns_test.ts`   | Tests for the quilt pattern functions.       |
| `quilt_ops.ts`       | Implements quilt operations such as vertical and horizontal flipping. |
| `quilt_ops_test.ts`  | Tests for the quilt operation functions.     |
| `index.tsx`          | Main entry point that renders the quilt patterns in the browser. |
| `quilt_form.tsx`     | Provides a user interface form for selecting and displaying quilt patterns. |

    
