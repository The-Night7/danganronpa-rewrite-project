/*
 * script.js – Gère les interactions sur les pages de personnages du projet de réécriture Danganronpa.
 *
 * - La fonction filterCharacters() permet de filtrer la liste en fonction de
 *   l'interprète sélectionné dans le menu déroulant.
 * - La fonction initialiseCharacterPopups() ajoute des popups contextuelles
 *   au clic sur chaque personnage. Ces popups affichent des informations
 *   détaillées lorsqu'elles sont disponibles dans le dictionnaire characterData,
 *   sinon un message par défaut.
 */

/**
 * Filtre les personnages en fonction de l'interprète sélectionné.
 *
 * @param {HTMLSelectElement} selectEl L'élément select qui déclenche l'événement.
 */
function filterCharacters(selectEl) {
    // La valeur sélectionnée correspond soit à « all » soit à une classe d'interprète
    const performer = selectEl.value;
    // Cherche le conteneur de liste le plus proche associé à ce select
    const container = selectEl.closest('main');
    if (!container) return;
    const list = container.querySelector('#character-list');
    if (!list) return;
    const items = list.querySelectorAll('li');
    items.forEach(item => {
        if (performer === 'all' || item.classList.contains(performer)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

// ====================================================================
// Données détaillées pour certains personnages spécifiques.
// Clef : nom du personnage tel qu'il apparaît dans la liste.
// Valeur : objet contenant une propriété `info` avec du HTML prêt à
// insérer dans la popup. On peut enrichir ce dictionnaire sans
// modifier la logique plus bas.
const characterData = {
    'Kyoko Kirigiri': {
        info: `
            <strong>Âge&nbsp;:</strong> 18&nbsp;ans<br>
            <strong>Date de naissance&nbsp;:</strong> 6&nbsp;octobre<br>
            <strong>Nationalité&nbsp;:</strong> Japonaise<br>
            <strong>Genre&nbsp;:</strong> Femme cisgenre, bisexuelle<br>
            <strong>Ultime&nbsp;:</strong> Détective (Ultime Détective) – 78<sup>e</sup>&nbsp;promotion de Hope’s Peak<br>
            <strong>Taille/poids&nbsp;:</strong> 1 m 67, 48&nbsp;kg<br>
            <strong>Cheveux/yeux&nbsp;:</strong> Violets clairs<br>
            <strong>Style vestimentaire&nbsp;:</strong> Veste violette, chemise blanche, cravate marron clair, jupe courte, bottes longues et gants<br>
            <strong>Personnalité&nbsp;:</strong> Froide, discrète et analytique ; passionnée par l’enquête ; évite le contact physique ; peu expressive<br>
            <strong>Goûts&nbsp;:</strong> Aime les tresses ; déteste la margose et la coriandre ; thalassophobie<br>
            <strong>Histoire&nbsp;:</strong> Fille de Jin Kirigiri (directeur de Hope’s Peak) et formée par son grand‑père Fuhito ; a surmonté le harcèlement de son ancien patron et a intégré Hope’s Peak en tant que détective<br>
            <strong>Document complet&nbsp;:</strong> <a href="https://docs.google.com/document/d/18F6KkPIS1WOPWm-kuBAIW6MLtlqgTOKGpl08BVj8WZE/edit?tab=t.0" target="_blank">Lien vers la fiche</a>
        `
    }
};

/**
 * Initialise les popups contextuelles pour chaque personnage présent dans la liste.
 * Un clic sur un personnage affiche ou masque la popup associée.
 */
function initialiseCharacterPopups() {
    const items = document.querySelectorAll('#character-list li');
    items.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            // Si une popup est déjà présente pour cet élément, on la retire et on arrête
            const existing = item.querySelector('.character-popup');
            if (existing) {
                existing.remove();
                return;
            }
            // Ferme les popups ouvertes ailleurs sur la page
            document.querySelectorAll('.character-popup').forEach(p => p.remove());
            // Prépare les informations à afficher
            const fullText = item.textContent.trim();
            const separatorIndex = fullText.indexOf('–');
            let name = fullText;
            let performer = '';
            if (separatorIndex !== -1) {
                name = fullText.slice(0, separatorIndex).trim();
                performer = fullText.slice(separatorIndex + 1).trim();
            }
            // Création de l'élément popup
            const popup = document.createElement('div');
            popup.classList.add('character-popup');
            const titleEl = document.createElement('h4');
            titleEl.textContent = name;
            const performerEl = document.createElement('p');
            performerEl.textContent = performer;
            popup.appendChild(titleEl);
            if (performer) popup.appendChild(performerEl);
            // Description à partir du dictionnaire ou texte par défaut
            const descriptionEl = document.createElement('p');
            if (characterData[name] && characterData[name].info) {
                descriptionEl.innerHTML = characterData[name].info;
            } else {
                descriptionEl.textContent = 'Informations clés à propos de ce personnage bientôt disponibles.';
            }
            popup.appendChild(descriptionEl);
            // Ajout de la popup à l'élément listé
            item.appendChild(popup);
        });
    });
    // Ferme les popups lorsqu'on clique ailleurs sur la page
    document.addEventListener('click', function() {
        document.querySelectorAll('.character-popup').forEach(p => p.remove());
    });
}

// Lance l'initialisation des popups une fois que le DOM est prêt
document.addEventListener('DOMContentLoaded', function() {
    initialiseCharacterPopups();
});