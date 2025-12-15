/*
 * script.js – Gère l'interaction simple des pages de personnages.
 * La fonction principale filtre l'affichage des personnages en fonction
 * de l'interprète sélectionné dans la liste déroulante. Chaque liste
 * déroulante appelle filterCharacters(this) via l'attribut onchange.
 */

/**
 * Filtre les personnages en fonction de l'interprète sélectionné.
 *
 * @param {HTMLSelectElement} selectEl L'élément select qui déclenche l'événement.
 */
function filterCharacters(selectEl) {
    // La valeur sélectionnée correspond soit à «all» soit à une classe de performer
    const performer = selectEl.value;
    // On cherche le conteneur de liste le plus proche associé à ce select
    // pour éviter d'impacter les autres pages.
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

/*
 * Ajoute un comportement de clic sur chaque entrée de personnage afin
 * d'afficher une fenêtre contextuelle avec des informations clés. La
 * fenêtre apparaît sous l'élément cliqué et se ferme si l'utilisateur
 * clique de nouveau dessus ou si une autre entrée est sélectionnée.
 */
function initialiseCharacterPopups() {
    // Sélectionne toutes les listes de personnages présentes sur la page
    const lists = document.querySelectorAll('#character-list li');
    lists.forEach(item => {
        // L'événement est attaché une seule fois par élément
        item.addEventListener('click', (e) => {
            // Empêche la propagation pour éviter des clics multiples
            e.stopPropagation();
            // Si cet élément possède déjà une popup ouverte, on la retire et on quitte
            const existing = item.querySelector('.character-popup');
            if (existing) {
                existing.remove();
                return;
            }
            // Ferme toute fenêtre déjà ouverte ailleurs
            document.querySelectorAll('.character-popup').forEach(p => p.remove());
            // Détermine le texte à afficher
            const fullText = item.textContent.trim();
            let name = fullText;
            let performer = '';
            // Sépare le nom du personnage et l'interprète sur le premier tiret long '–'
            const separatorIndex = fullText.indexOf('–');
            if (separatorIndex !== -1) {
                name = fullText.slice(0, separatorIndex).trim();
                performer = fullText.slice(separatorIndex + 1).trim();
            }
            // Crée le conteneur de la popup
            const popup = document.createElement('div');
            popup.classList.add('character-popup');
            // Contenu principal : nom et interprète
            const titleEl = document.createElement('h4');
            titleEl.textContent = name;
            const performerEl = document.createElement('p');
            performerEl.innerHTML = performer;
            // Texte descriptif par défaut. Ce paragraphe pourra être
            // alimenté avec davantage de données ultérieurement (par exemple
            // via un attribut data-description ou un dictionnaire). Pour
            // l'instant, on indique simplement que des informations clés
            // seront ajoutées.
            const descriptionEl = document.createElement('p');
            descriptionEl.textContent = 'Informations clés à propos de ce personnage bientôt disponibles.';
            // Ajoute les éléments à la popup
            popup.appendChild(titleEl);
            if (performer) popup.appendChild(performerEl);
            popup.appendChild(descriptionEl);
            // Insère la popup dans l'élément li. Grâce à la
            // position:relative de la liste (définie dans le CSS), la
            // fenêtre contextuelle sera positionnée de manière absolue par
            // rapport à l'élément.
            item.appendChild(popup);
        });
    });
    // Ferme la popup si l'utilisateur clique ailleurs sur la page
    document.addEventListener('click', () => {
        document.querySelectorAll('.character-popup').forEach(p => p.remove());
    });
}

// Lorsque le DOM est prêt, on initialise les popups. Comme le script est
// chargé avec l'attribut `defer`, le DOM est disponible à ce moment-là.
document.addEventListener('DOMContentLoaded', () => {
    initialiseCharacterPopups();
});