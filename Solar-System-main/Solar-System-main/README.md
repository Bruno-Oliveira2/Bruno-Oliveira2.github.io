# Solar System Explorer

An interactive web application to explore and compare planets in our solar system.

## Course Information

- **Course:** Web Programming and Design
- **Course Code:** CPAN-134-0NC
- **Instructor:** Sepideh Banihashemi

## Team Members

- Bruno Oliveira
- Arshmit Grewal
- Murilo Holtz

## Project Overview

This project was built as part of the **Web Programming and Design** course. It demonstrates proficiency in HTML, CSS, and JavaScript through two main features:

### Feature 1 — Solar System Explorer (Home Page)

An interactive visualization of the solar system with animated orbits. Users can click on any planet to view detailed information including diameter, number of moons, distance from the Sun, surface temperature, and a fun fact. A search bar allows users to quickly find a planet by name.

**Key features:**
- Animated orbital system with realistic relative speeds
- Clickable planets with popup info cards
- Search functionality with Enter key support
- Smooth animations and transitions
- Dark space-themed design

### Feature 2 — Planet Comparator (Compare Page)

A side-by-side comparison tool that lets users select two planets and compare their physical properties using visual bar charts. Stats include equatorial diameter, mass, number of moons, distance from the Sun, surface temperature, orbital period, and surface gravity.

**Key features:**
- Dual planet selection with color-coded panels
- Proportional bar comparison for 7 different stats
- Temperature normalization to handle negative values
- Responsive layout that stacks on mobile
- Reset button to clear selections

## Technologies Used

- **HTML5** — Semantic structure and accessibility
- **CSS3** — Custom properties, animations, gradients, responsive design, backdrop filters
- **JavaScript** — DOM manipulation, async/await, event handling, data caching

## Project Structure

```
Solar-System/
├── index.html          # Home page with solar system explorer
├── compare.html        # Planet comparison page
├── about.html          # About us page
├── styles/
│   ├── styles.css      # Global styles and sidebar
│   ├── main.css        # Home page styles (solar system, popup)
│   ├── compare.css     # Comparison page styles
│   └── about.css       # About page styles
├── script/
│   ├── index.js        # Home page logic (search, popup)
│   └── compare.js      # Comparison logic (stats, bars)
├── imgs/               # Images and icons
└── planets-data.json   # Planet data source
```

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/Holtz777/Solar-System.git
   ```

2. Open `index.html` in a browser, or use a local server:
   ```bash
   # Using Python
   python -m http.server

   # Using Node.js (npx)
   npx serve
   ```

3. Navigate to `http://localhost:8000`

## Design Decisions

- **Dark theme** — Matches the space aesthetic and reduces eye strain
- **CSS custom properties** — Makes it easy to maintain consistent spacing, colors, and transitions
- **Data caching** — Planet data is fetched once and cached to avoid repeated network requests
- **Temperature normalization** — Negative temperatures are shifted before comparison so bar percentages remain accurate
- **Orbit hiding** — Orbits fade out when the popup is open to avoid visual clutter
- **Responsive design** — The compare page stacks vertically on screens smaller than 768px

## License

This project was created for educational purposes as part of the CPAN-134 course at Humber College.
