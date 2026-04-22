// data for all 8 solar system planets
var planets = {
    Mercury: {
        diameter: 4879,
        mass: 0.330,
        moons: 0,
        distance: 57.9,
        temp: 167,
        period: 88,
        gravity: 3.7
    },
    Venus: {
        diameter: 12104,
        mass: 4.87,
        moons: 0,
        distance: 108.2,
        temp: 464,
        period: 225,
        gravity: 8.9
    },
    Earth: {
        diameter: 12756,
        mass: 5.97,
        moons: 1,
        distance: 149.6,
        temp: 15,
        period: 365,
        gravity: 9.8
    },
    Mars: {
        diameter: 6792,
        mass: 0.642,
        moons: 2,
        distance: 227.9,
        temp: -63,
        period: 687,
        gravity: 3.7
    },
    Jupiter: {
        diameter: 142984,
        mass: 1898,
        moons: 95,
        distance: 778.6,
        temp: -108,
        period: 4333,
        gravity: 23.1
    },
    Saturn: {
        diameter: 120536,
        mass: 568,
        moons: 146,
        distance: 1433.5,
        temp: -139,
        period: 10759,
        gravity: 9.0
    },
    Uranus: {
        diameter: 51118,
        mass: 86.8,
        moons: 28,
        distance: 2872.5,
        temp: -197,
        period: 30687,
        gravity: 8.7
    },
    Neptune: {
        diameter: 49528,
        mass: 102,
        moons: 16,
        distance: 4495.1,
        temp: -201,
        period: 60190,
        gravity: 11.0
    }
};

// keys used to build the comparison bars
var statKeys = [
    "diameter",
    "mass",
    "moons",
    "distance",
    "temp",
    "period",
    "gravity"
];

// update the stats panel for one side (left or right)
function updateStats(panelId, planetName) {
    var panel = document.getElementById(panelId);

    // nothing selected, show placeholder
    if (!planetName) {
        panel.innerHTML = '<p class="placeholder-text">Select a planet to see its data.</p>';
        return;
    }

    var p = planets[planetName];

    // build HTML with each stat for the planet
    panel.innerHTML =
        '<div class="stat-item">' +
            '<p class="stat-label">Equatorial Diameter</p>' +
            '<p class="stat-value">' + p.diameter.toLocaleString() + ' km</p>' +
        '</div>' +

        '<div class="stat-item">' +
            '<p class="stat-label">Mass</p>' +
            '<p class="stat-value">' + p.mass + ' × 10²⁴ kg</p>' +
        '</div>' +

        '<div class="stat-item">' +
            '<p class="stat-label">Confirmed Moons</p>' +
            '<p class="stat-value">' + p.moons + '</p>' +
        '</div>' +

        '<div class="stat-item">' +
            '<p class="stat-label">Avg. Distance from Sun</p>' +
            '<p class="stat-value">' + p.distance.toLocaleString() + ' million km</p>' +
        '</div>' +

        '<div class="stat-item">' +
            '<p class="stat-label">Avg. Surface Temperature</p>' +
            '<p class="stat-value">' + p.temp + ' °C</p>' +
        '</div>' +

        '<div class="stat-item">' +
            '<p class="stat-label">Length of Year</p>' +
            '<p class="stat-value">' + p.period.toLocaleString() + ' Earth days</p>' +
        '</div>' +

        '<div class="stat-item">' +
            '<p class="stat-label">Surface Gravity</p>' +
            '<p class="stat-value">' + p.gravity + ' m/s²</p>' +
        '</div>';
}

// update the comparison bars between the two planets
function updateBars() {
    var name1 = document.getElementById("planet1").value;
    var name2 = document.getElementById("planet2").value;

    var p1 = planets[name1];
    var p2 = planets[name2];

    for (var i = 0; i < statKeys.length; i++) {
        var key = statKeys[i];

        var bar1 = document.getElementById("bar1-" + key);
        var bar2 = document.getElementById("bar2-" + key);

        // no planet selected
        if (!p1 && !p2) {
            bar1.style.width = "0%";
            bar1.textContent = "";
            bar2.style.width = "0%";
            bar2.textContent = "";

        // only first planet
        } else if (p1 && !p2) {
            bar1.style.width = "100%";
            bar1.textContent = "100%";
            bar2.style.width = "0%";
            bar2.textContent = "";

        // only second planet
        } else if (!p1 && p2) {
            bar1.style.width = "0%";
            bar1.textContent = "";
            bar2.style.width = "100%";
            bar2.textContent = "100%";

        // both selected - calculate proportion
        } else {
            var value1 = p1[key];
            var value2 = p2[key];

            // workaround for temperature: since values can be negative,
            // add a shift to both so the percentage calculation works
            if (key === "temp") {
                var minTemp = Math.min(value1, value2);
                if (minTemp <= 0) {
                    var shift = 1 - minTemp;
                    value1 += shift;
                    value2 += shift;
                }
            }

            var total = value1 + value2;
            var pct1;

            if (total === 0) {
                pct1 = 50;
            } else {
                pct1 = Math.round((value1 / total) * 100);
            }

            var pct2 = 100 - pct1;

            bar1.style.width = pct1 + "%";
            bar1.textContent = pct1 + "%";
            bar2.style.width = pct2 + "%";
            bar2.textContent = pct2 + "%";
        }
    }
}

// when planet 1 select changes
document.getElementById("planet1").addEventListener("change", function () {
    updateStats("stats1", this.value);
    updateBars();
});

// when planet 2 select changes
document.getElementById("planet2").addEventListener("change", function () {
    updateStats("stats2", this.value);
    updateBars();
});
