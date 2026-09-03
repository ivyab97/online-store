import { header } from "./Components/header.js";
import { footer } from "./Components/footer.js";


const CATHEDRAL_COORDINATES = [
    -34.9215,
    -57.9536
];


const initializeMap = () => {

    const mapContainer =
        document.getElementById("map");


    if (!mapContainer) {

        console.error(
            "No se encontró el contenedor del mapa."
        );

        return;
    }


    if (typeof L === "undefined") {

        console.error(
            "Leaflet no pudo cargarse."
        );

        mapContainer.innerHTML = `
            <p class="map-error">
                No se pudo cargar el mapa.
            </p>
        `;

        return;
    }


    /* =========================
       MAPA
    ========================== */

    const map =
        L.map("map").setView(
            CATHEDRAL_COORDINATES,
            16
        );


    /* =========================
       OPENSTREETMAP
    ========================== */

    L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,

            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    ).addTo(map);


    /* =========================
       MARCADOR
    ========================== */

    const marker =
        L.marker(
            CATHEDRAL_COORDINATES
        ).addTo(map);


    marker.bindPopup(`
        <strong>
            Catedral de La Plata
        </strong>
        <br>
        La Plata, Buenos Aires
    `);


    marker.openPopup();
};


document.addEventListener(
    "DOMContentLoaded",
    () => {

        const headerContainer =
            document.getElementById("header");

        const footerContainer =
            document.getElementById("footer");


        headerContainer.innerHTML =
            header();

        footerContainer.innerHTML =
            footer();


        initializeMap();

    }
);