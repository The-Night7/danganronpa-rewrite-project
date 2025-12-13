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