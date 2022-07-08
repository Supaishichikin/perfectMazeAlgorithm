function generateTableMaze(m,n){
    const table = document.querySelector('table');
    var openWallCount = 0;
    var cellsCount = 0;

    //on génère le tableau
    for(let i = 0; i < m ; i++){
        table.insertAdjacentHTML('beforeend','<tr data-row="'+i+'"></tr>');
        for(let j = 0; j < n ; j++){
            let actualRow = document.querySelector('tr[data-row="'+i+'"]');
            //on insère les cellules en y ajoutant les coordonnées de leur position
            actualRow.insertAdjacentHTML('beforeend',
                '<td data-position-y="' + i +'" data-position-x="' + j +'" data-cell="' + cellsCount +'" ></td>');
            //on va vérifier si la cellule que l'on a créée peut être une case d'entrée ou de sortie du labyrinthe
            let possibleEntryEndCell = document.querySelector('td[data-cell="'+ cellsCount+'"]');

            //si c'est une case en bordure gauche, elle est élégible pour être une case d'entrée. On lui ajoute donc une class
            if (possibleEntryEndCell.getAttribute('data-position-x') == 0){
                possibleEntryEndCell.classList.add('possibleEntryCell');
            //si c'est une case en bordure droite, elle est élégible pour être une case de sortie. On lui ajoute donc une class
            }else if(possibleEntryEndCell.getAttribute('data-position-x') == n-1) {
                possibleEntryEndCell.classList.add('possibleEndCell');
            }

            cellsCount++;
        }
    }

    //on sélectionne une case d'entrée et de sortie au hasard
    let possibleEndCells = document.querySelectorAll('td.possibleEndCell');
    let possibleEntryCells = document.querySelectorAll('td.possibleEntryCell');
    possibleEndCells[Math.floor(Math.random()*possibleEndCells.length)].classList.add('border-right-none');
    possibleEntryCells[Math.floor(Math.random()*possibleEntryCells.length)].classList.add('border-left-none');

    //on stock les 4 directions possibles dans un array
    const orientation = ["N","O","S","E"];
    while(openWallCount < (m*n) -1 ){
        //on choisit une cellule aléatoirement pour ouvrir un mur
        let max = (m*n)-1;

        let cellNumber = Math.floor(Math.random() * max );

        let targetCell = document.querySelector('td[data-cell="'+ cellNumber +'"]');

        // on lui affecte un ID de chemin
        if(targetCell.getAttribute('data-path-id') == null){
            targetCell.setAttribute('data-path-id', targetCell.getAttribute('data-cell'));
        }
        var dataPositionY = parseInt(targetCell.getAttribute('data-position-y')); //on récupère les coordonnées d'ordonnée de la cellule cible
        var dataPositionX = parseInt(targetCell.getAttribute('data-position-x')); //on récupère les coordonnées d'abscisse de la cellule cible
        //On choisit une direction à partir de la case choisit aléatoirement
        switch(orientation[Math.floor(Math.random()*4)]){
            //NORD
            case "N":
                // on vérifie que l'on peut aller en haut
                if(targetCell.getAttribute('data-position-y') > 0){

                    var neighboringCell = document.querySelector('td[data-position-y="'+ (dataPositionY -1) + '"][data-position-x="'+ dataPositionX + '"]');
                    //on vérifie si la cellule voisine appartient au groupe de la cellule cible
                    if(neighboringCell.getAttribute('data-path-id') != targetCell.getAttribute('data-path-id')){
                        //on affecte l'id de chemin de la cellule cible à tout le groupe de la cellule voisine
                        var neighboringCellGroup = document.querySelectorAll('td[data-path-id="' + neighboringCell.getAttribute('data-path-id')+'"]');
                        for(let i = 0; i < neighboringCellGroup.length; i++){

                            neighboringCellGroup[i].setAttribute('data-path-id', targetCell.getAttribute('data-path-id'));
                        }
                        //on s'assure que la cellule voisine ait bien un id de chemin au cas où la variable neighboringCellGroup est vide
                        neighboringCell.setAttribute('data-path-id', targetCell.getAttribute('data-path-id'));// si la case voisine n'avait pas d'id de chemin, on lui affecte.
                        neighboringCell.classList.add('border-bottom-none');//on fait visuellement disparaitre la porte
                        targetCell.classList.add('border-top-none');//on fait visuellement disparaitre la porte
                        openWallCount++;
                    }
                }
                break;
            //OUEST
            case "O":
                // on vérifie que l'on peut aller à gauche
                if(targetCell.getAttribute('data-position-x') > 0){

                    var neighboringCell = document.querySelector('td[data-position-y="'+ dataPositionY + '"][data-position-x="'+ (dataPositionX-1) + '"]');

                    //on vérifie si la cellule voisine appartient au groupe de la cellule cible
                    if(neighboringCell.getAttribute('data-path-id') != targetCell.getAttribute('data-path-id')){
                        //on affecte l'id de chemin de la cellule cible à tout le groupe de la cellule voisine
                        var neighboringCellGroup = document.querySelectorAll('td[data-path-id="' + neighboringCell.getAttribute('data-path-id')+'"]');
                        for(let i = 0; i < neighboringCellGroup.length; i++){
                            neighboringCellGroup[i].setAttribute('data-path-id', targetCell.getAttribute('data-path-id'));
                        }
                        //dans le cas contraire on affecte seulement
                        neighboringCell.setAttribute('data-path-id', targetCell.getAttribute('data-path-id'));// si la case voisine n'avait pas d'id de chemin, on lui affecte.
                        neighboringCell.classList.add('border-right-none');//on fait visuellement disparaitre la porte
                        targetCell.classList.add('border-left-none');//on fait visuellement disparaitre la porte
                        openWallCount++;
                    }
                }
                break;
            //SUD
            case "S":
                // on vérifie que l'on peut aller en bas
                if(targetCell.getAttribute('data-position-y') < m-1){

                    var neighboringCell = document.querySelector('td[data-position-y="'+ (dataPositionY +1) + '"][data-position-x="'+ dataPositionX + '"]');
                    //on vérifie si la cellule voisine appartient au groupe de la cellule cible
                    if(neighboringCell.getAttribute('data-path-id') != targetCell.getAttribute('data-path-id')){
                        //on affecte l'id de chemin de la cellule cible à tout le groupe de la cellule voisine
                        var neighboringCellGroup = document.querySelectorAll('td[data-path-id="' + neighboringCell.getAttribute('data-path-id')+'"]');
                        for(let i = 0; i < neighboringCellGroup.length; i++){
                            neighboringCellGroup[i].setAttribute('data-path-id', targetCell.getAttribute('data-path-id'));
                        }
                        neighboringCell.setAttribute('data-path-id', targetCell.getAttribute('data-path-id'));// si la case voisine n'avait pas d'id de chemin, on lui affecte.
                        neighboringCell.classList.add('border-top-none');//on fait visuellement disparaitre la porte
                        targetCell.classList.add('border-bottom-none');//on fait visuellement disparaitre la porte
                        openWallCount++;
                    }
                }
                break;
            //EST
            case "E":
                // on vérifie que l'on peut aller à droite
                if(targetCell.getAttribute('data-position-x') < n-1){

                    // on en déduit le voisin de droite
                    var neighboringCell = document.querySelector('td[data-position-y="'+ dataPositionY + '"][data-position-x="'+ (dataPositionX+1) + '"]');

                    //on vérifie si la cellule voisine appartient au groupe de la cellule cible
                    if(neighboringCell.getAttribute('data-path-id') != targetCell.getAttribute('data-path-id')){

                        //on affecte l'id de chemin de la cellule cible à tout le groupe de la cellule voisine
                        var neighboringCellGroup = document.querySelectorAll('td[data-path-id="' + neighboringCell.getAttribute('data-path-id')+'"]');
                        for(let i = 0; i < neighboringCellGroup.length; i++){
                            neighboringCellGroup[i].setAttribute('data-path-id', targetCell.getAttribute('data-path-id'));
                        }
                        neighboringCell.setAttribute('data-path-id', targetCell.getAttribute('data-path-id'));// si la case voisine n'avait pas d'id de chemin, on lui affecte.
                        neighboringCell.classList.add('border-left-none');//on fait visuellement disparaitre la porte
                        targetCell.classList.add('border-right-none');//on fait visuellement disparaitre la porte
                        openWallCount++;//on incrémente le compteur
                    }
                }
                break;
        }

    }

}
//s'assurer que le HTML soit chargé avant l'appel du js
function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

//appel de la fonction
docReady(function(){
    //on récupère les paramètres de la requête stocké dans le DOM
    let width = document.querySelector('table').getAttribute('data-width');
    let height = document.querySelector('table').getAttribute('data-height');

    generateTableMaze(height,width);
})