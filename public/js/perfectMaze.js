function generateTable(table, height, width){
    let cellsCount = 0;
    for(let i = 0; i < height ; i++){
        table.insertAdjacentHTML('beforeend','<tr data-row="'+i+'"></tr>');
        for(let j = 0; j < width ; j++){
            let actualRow = document.querySelector('tr[data-row="'+i+'"]');
            //on insère les cellules en y ajoutant les coordonnées de leur position
            actualRow.insertAdjacentHTML('beforeend',
                '<td data-position-y="' + i +'" data-position-x="' + j +'" data-cell="' + cellsCount +'" ></td>');
            //on va vérifier si la cellule que l'on a créée peut être une case d'entrée ou de sortie du labyrinthe
            let possibleEntryEndCell = document.querySelector('td[data-cell="'+ cellsCount+'"]');

            //si c'est une case en bordure gauche, elle est éligible pour être une case d'entrée. On lui ajoute donc une class
            if (possibleEntryEndCell.getAttribute('data-position-x') == 0){
                possibleEntryEndCell.classList.add('possibleEntryCell');//on ajoute une classe pour marquer la cellule
                //si c'est une case en bordure droite, elle est éligible pour être une case de sortie. On lui ajoute donc une class
            }else if(possibleEntryEndCell.getAttribute('data-position-x') == width-1) {
                possibleEntryEndCell.classList.add('possibleEndCell');//on ajoute une classe pour marquer la cellule
            }

            cellsCount++;//on incrémente
        }
    }
}
//affecter tout un groupe de cellule le path-id de la cellule choisit
function affectationGroupPathId(neighboringCell, targetCell ){
    //on affecte un l'id de chemin de la cellule cible à tout le groupe de cellule dont l'id de chemin est le même que la cellule voisine
    let neighboringCellsGroup = document.querySelectorAll('td[data-path-id="' + neighboringCell.getAttribute('data-path-id')+'"]');
    //on parcourt le tableau en attribuant un path-id à chaque cellule
    for(let i = 0; i < neighboringCellsGroup.length; i++){
        neighboringCellsGroup[i].setAttribute('data-path-id', targetCell.getAttribute('data-path-id'));
    }
    //dans le cas contraire on affecte seulement
    neighboringCell.setAttribute('data-path-id', targetCell.getAttribute('data-path-id'));// si la case voisine n'avait pas d'id de chemin, on lui affecte.
}

function generateTableMaze(height,width){
    const table = document.querySelector('table');
    let openWallCount = 0;//compteur de mur ouvert

    //on génère le tableau
    generateTable(table,height,width);

    //on sélectionne une case d'entrée et de sortie au hasard en commençant par récupérer les cellules éligibles
    let possibleEndCells = document.querySelectorAll('td.possibleEndCell');
    let possibleEntryCells = document.querySelectorAll('td.possibleEntryCell');

    //on sélectionne une cellule d'entrée et une de fin au hasard et on fait disparaitre les murs mur
    possibleEndCells[Math.floor(Math.random()*possibleEndCells.length)].classList.add('border-right-none');
    possibleEntryCells[Math.floor(Math.random()*possibleEntryCells.length)].classList.add('border-left-none');

    //on stock les 4 directions possibles dans un array
    const orientations = ["N","O","S","E"];
    while(openWallCount < (height*width) -1 ){

        //on choisit une cellule aléatoirement pour ouvrir un mur
        let max = (height*width)-1;
        let cellNumber = Math.floor(Math.random() * max );
        let targetCell = document.querySelector('td[data-cell="'+ cellNumber +'"]');

        // on lui affecte un ID de chemin
        if(targetCell.getAttribute('data-path-id') == null){
            targetCell.setAttribute('data-path-id', targetCell.getAttribute('data-cell'));
        }
        let dataPositionY = parseInt(targetCell.getAttribute('data-position-y')); //on récupère les coordonnées d'ordonnée de la cellule cible
        let dataPositionX = parseInt(targetCell.getAttribute('data-position-x')); //on récupère les coordonnées d'abscisse de la cellule cible
        //On choisit une direction à partir de la case choisit aléatoirement
        switch(orientations[Math.floor(Math.random()*4)]){
            //NORD
            case "N":
                // on vérifie que l'on peut aller en haut
                if(targetCell.getAttribute('data-position-y') > 0){
                    let neighboringCell = document.querySelector('td[data-position-y="'+ (dataPositionY -1) + '"][data-position-x="'+ dataPositionX + '"]');
                    if(neighboringCell != null) {
                        //on vérifie si la cellule voisine appartient au groupe de la cellule cible
                        if (neighboringCell.getAttribute('data-path-id') != targetCell.getAttribute('data-path-id')) {
                            //on affecte l'id de chemin de la cellule cible à tout le groupe de la cellule voisines
                            affectationGroupPathId(neighboringCell, targetCell);
                            //on fait visuellement disparaitre les portes
                            neighboringCell.classList.add('border-bottom-none');
                            targetCell.classList.add('border-top-none');
                            openWallCount++;
                        }
                    }
                }
                break;
            //OUEST
            case "O":
                // on vérifie que l'on peut aller à gauche
                if(targetCell.getAttribute('data-position-x') > 0){
                    let neighboringCell = document.querySelector('td[data-position-y="'+ dataPositionY + '"][data-position-x="'+ (dataPositionX-1) + '"]');
                    if(neighboringCell != null){
                        //on vérifie si la cellule voisine appartient au groupe de la cellule cible
                        if(neighboringCell.getAttribute('data-path-id') != targetCell.getAttribute('data-path-id')){
                            //on affecte l'id de chemin de la cellule cible à tout le groupe de la cellule voisine
                            affectationGroupPathId(neighboringCell,targetCell);
                            neighboringCell.classList.add('border-right-none');//on fait visuellement disparaitre la porte
                            targetCell.classList.add('border-left-none');//on fait visuellement disparaitre la porte
                            openWallCount++;
                        }
                    }
                }
                break;
            //SUD
            case "S":
                // on vérifie que l'on peut aller en bas
                if(targetCell.getAttribute('data-position-y') < height-1){
                    let neighboringCell = document.querySelector('td[data-position-y="'+ (dataPositionY +1) + '"][data-position-x="'+ dataPositionX + '"]');
                    if(neighboringCell != null){
                        //on vérifie si la cellule voisine appartient au groupe de la cellule cible
                        if(neighboringCell.getAttribute('data-path-id') != targetCell.getAttribute('data-path-id')){
                            //on affecte l'id de chemin de la cellule cible à tout le groupe de la cellule voisine
                            affectationGroupPathId(neighboringCell,targetCell);
                            neighboringCell.classList.add('border-top-none');//on fait visuellement disparaitre la porte
                            targetCell.classList.add('border-bottom-none');//on fait visuellement disparaitre la porte
                            openWallCount++;
                        }
                    }
                }
                break;
            //EST
            case "E":
                // on vérifie que l'on peut aller à droite
                if(targetCell.getAttribute('data-position-x') < width-1){
                    // on en déduit le voisin de droite
                    let neighboringCell = document.querySelector('td[data-position-y="'+ dataPositionY + '"][data-position-x="'+ (dataPositionX+1) + '"]');
                    if(neighboringCell != null){
                        //on vérifie si la cellule voisine appartient au groupe de la cellule cible
                        if(neighboringCell.getAttribute('data-path-id') != targetCell.getAttribute('data-path-id')){
                            //on affecte l'id de chemin de la cellule cible à tout le groupe de la cellule voisine
                            affectationGroupPathId(neighboringCell,targetCell);
                            neighboringCell.classList.add('border-left-none');//on fait visuellement disparaitre la porte
                            targetCell.classList.add('border-right-none');//on fait visuellement disparaitre la porte
                            openWallCount++;//on incrémente le compteur
                        }
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
    //on récupère les paramètres de la requête stockés dans le DOM
    let width = document.querySelector('table').getAttribute('data-width');
    let height = document.querySelector('table').getAttribute('data-height');

    generateTableMaze(height,width);
})