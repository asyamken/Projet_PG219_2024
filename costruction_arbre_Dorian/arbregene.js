//const { on } = require("nodemon");

var treeid = 0;
var dist = 191.2;
var action = 0;
var maxchildren = 0;
var Treeparent1 = null;
var Treeparent2 = null;
var Containerparent1 = null;
var Containerparent2 = null;

var arbrestruct = [[]];
var containstruct = [[]];

var x = 0;
var y = 0;
var w = 0;
var z = 0;

function addTree(position,origin,x,y) {
    const parentElement = event.target.parentElement;
    
    const newTree = new Tree(-1, -1, "", "", [], treeid);
    treeid++;

    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center"; // Add this line to center items in the container
    container.style.justifyContent = "center"; // Add this line to center items in the container vertically
    container.appendChild(newTree.button1);
    container.appendChild(newTree.rectangle);
    container.appendChild(newTree.inputnom);
    container.appendChild(newTree.inputprenom);
    container.appendChild(newTree.validerButton);
    container.appendChild(newTree.button2);

    if (position === "up") {
        if (!arbrestruct[x-1]) {
            arbrestruct[x-1] = [];
        }
        if (!containstruct[x-1]) {
            containstruct[x-1] = [];
        }

        for (let i = 0; i < y; i++) {
            if (!arbrestruct[x-1][i]) {
            arbrestruct[x-1][i] = null;
            containstruct[x-1][i] = null;
            }
        }

        arbrestruct[x-1].splice(y, 0, newTree);
        containstruct[x-1].splice(y, 0, container);


        console.log(containstruct);
        document.body.insertBefore(container, parentElement);
        container.style.position = "absolute";
        container.style.left = `${100 + y * 163.867}px`;
        container.style.top = `${200 + (x-1) * 191.2}px`;

        // Loop to update the horizontal positions of other containers in the same row
        for (let i = y + 1; i < containstruct[x-1].length; i++) {
            const currContainer = containstruct[x-1][i];
            currContainer.style.left = `${parseInt(currContainer.style.left) + 191.2}px`;
        }

        newTree.button1.style.display = "none";
        origin.style.display = "none";

        for (let i = 0; i < containstruct.length; i++) {
            for (let j = 0; j < containstruct[i].length; j++) {
                if(containstruct[i][j]){
                    const container = containstruct[i][j];
                    container.style.left =`${100 + i * 163.867}px`;
                    container.style.top =`${200 + j * 191.2}px`;
                }
            }
        }

    } else if (position === "right") {
        


        if (arbrestruct[x][y] && arbrestruct[x][y].pere !== -1) {
            newTree.pere = arbrestruct[x][y].pere;
            newTree.button1.style.display = "none";
            for (let i = 0; i < arbrestruct.length; i++) {
                for (let j = 0; j < arbrestruct[i].length; j++) {
                    if (arbrestruct[i][j] && arbrestruct[i][j].id === newTree.pere) {
                        arbrestruct[i][j].childlist.push(newTree.id);
                        console.log(arbrestruct[i][j].childlist);
                    }
                }
            }
        }

        if (containstruct[x][y+1]) {
            // Shift elements in containstruct[x] from y+1 to the end
            for (let i = containstruct[x].length - 1; i >= y+1; i--) {
                containstruct[x][i+1] = containstruct[x][i];
                containstruct[x][i+1].style.left = `${100 + (i+1) * 163.867}px`;
                containstruct[x][i+1].style.top = `${200 + x * 191.2}px`;
            }
            for (let i = arbrestruct[x].length - 1; i >= y+1; i--) {
                arbrestruct[x][i+1] = arbrestruct[x][i];
            }
        }

        arbrestruct[x][y+1] = newTree;
        containstruct[x][y+1] = container;

        console.log(containstruct);
        document.body.appendChild(containstruct[x][y+1]);
        container.style.position = "absolute";
        container.style.left = `${100 + (y+1) * 163.867}px`;
        container.style.top = `${200 + x * 191.2}px`;

    } else if (position === "down") {
        const arbrepere = arbrestruct[x][y];
        newTree.pere = arbrepere.id;

        arbrepere.childlist.push(newTree.id);
        console.log(arbrepere.childlist);

        if (!arbrestruct[x+1]) {
            arbrestruct[x+1] = [];
        }
        if (!containstruct[x+1]) {
            containstruct[x+1] = [];
        }

        for (let i = 0; i < y; i++) {
            if (!arbrestruct[x+1][i]) {
            arbrestruct[x+1][i] = null;
            containstruct[x+1][i] = null;
            }
            
        }

        if (arbrestruct[x+1][y] === null) {
            arbrestruct[x+1].splice(y, 1);
            containstruct[x+1].splice(y, 1);
        }

        let insertIndex = y;
        if (arbrestruct[x][y-1]){console.log(`pere à gauche =${arbrestruct[x][y-1].id}`);}
        
        console.log(`insertIndex =${insertIndex}`);
        for (let i = y; i < arbrestruct[x+1].length; i++) {
            console.log(`y =${y}`);
            console.log(`arbrestruct[x+1].length =${arbrestruct[x+1].length}`);

            if (arbrestruct[x+1][i] && arbrestruct[x+1][i].pere !== -1) {
                console.log(`je suis dans la boucle : pere de gauche =${arbrestruct[x+1][i].pere}`);
                const parentIndex = arbrestruct[x+1][i].pere;
                if (parentIndex < arbrestruct[x][y].id) {
                    insertIndex = i + 1;
                }
            }
            console.log(`insertIndex =${insertIndex}`);
        }
        arbrestruct[x+1].splice(insertIndex, 0, newTree);
        containstruct[x+1].splice(insertIndex, 0, container);


        console.log(containstruct);
        document.body.appendChild(container);
        container.style.position = "absolute";
        container.style.left = `${100 + insertIndex * 163.867}px`;
        container.style.top = `${200 + (x+1) * 191.2}px`; //je ne sais absolument pas pourquoi mais le premier enfant est moins bas que ceux qui suivent

        origin.style.display = "none";
        newTree.button1.style.display = "none";
        
    }
}

function onArbrestructChanged() {
    for (let i = 0; i < containstruct.length; i++) {
        for (let j = 0; j < containstruct[i].length; j++) {
            const container = containstruct[i][j];
            container.style.position = "absolute";
            container.style.left =`${100 + i * 163.867}px`;
            container.style.top =`${200 + j * 191.2}px`;
            containstruct[i][j] = container;
        }
    }
}

// Cette fonction dessine une ligne entre deux éléments
function drawLine(nodex, nodey, x, y) {

    var x1 = nodex;
    var y1 = nodey;
    var x2 = 100 + y * 163.867 + 82;
    var y2 = 200 + x * 191.2 + 114;

    var line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.background = 'black';
    line.style.width = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) + 'px';
    line.style.height = '1px';
    line.style.transformOrigin = '0 0';
    line.style.transform = 'rotate(' + Math.atan2(y2 - y1, x2 - x1) + 'rad)';
    line.style.left = x1 + 'px';
    line.style.top = y1 + 'px';

    document.body.appendChild(line);
}

function toggleParent1TextVisibility() {
    var parent1Text = document.getElementById("text1");
    if (parent1Text.style.display === "none") {
        parent1Text.style.display = "block";
    } else {
        parent1Text.style.display = "none";
    }
}

function toggleParent2TextVisibility() {
    var parent1Text = document.getElementById("text2");
    if (parent1Text.style.display === "none") {
        parent1Text.style.display = "block";
    } else {
        parent1Text.style.display = "none";
    }
}


class Tree {
    constructor(pere, mere, currentnom, currentprenom, nbchild, treebuttonid) {
        this.pere = pere;
        this.mere = mere;
        this.currentbom = currentnom;
        this.currentprenom = currentprenom;
        this.nbchild = nbchild;
        this.id = treebuttonid;
        this.childlist = [];

        this.validerButton = document.createElement("button");
        this.validerButton.innerHTML = "Valider";

        this.rectangle = document.createElement("div");
        this.rectangle.style.width = "40px";
        this.rectangle.style.height = "50px";
        this.rectangle.style.backgroundColor = "black";
        this.rectangle.style.marginBottom = "20px"; 
        this.rectangle.style.marginTop = "20px";

        this.inputnom = document.createElement("input");
        this.inputnom.type = "text";
        this.inputprenom = document.createElement("input");
        this.inputprenom.type = "text";

        // Ajout du gestionnaire d'événements
        this.validerButton.addEventListener('click', (event) => {
            this.inputnom.disabled = true; // Rendre l'input non modifiable
            this.inputprenom.disabled = true; // Rendre l'input non modifiable
            this.currentnom = this.inputnom.value; // Définir tree.current sur le texte dans l'input
            this.currentprenom = this.inputprenom.value; // Définir tree.current sur le texte dans l'input
            console.log(this.currentnom);
            console.log(this.currentprenom);
        });

        this.button1 = document.createElement("button");
        this.button1.innerHTML = '<img src="ajout.png" alt="Ajouter" style="width: 30px; height: 30px;">';
        //this.button1.style.marginRight = "10px"; // Add right margin to create space between buttons

        this.button2 = document.createElement("button");
        this.button2.innerHTML = '<img src="ajout.png" alt="Ajouter2" style="width: 30px; height: 30px;">';
        //this.button2.style.marginLeft = "10px"; // Add left margin to create space between buttons

        this.button1.addEventListener('click', (event) => {
            for (let i = 0; i < arbrestruct.length; i++) {
                for (let j = 0; j < arbrestruct[i].length; j++) {
                    if (arbrestruct[i][j] && arbrestruct[i][j].id === this.id) {
                        // Do something with the found Tree
                        x = i;
                        y = j;
                    }
                }
            }
            addTree("up",this.button1,x,y);
            this.button1.style.display = "none";
        });
        this.button2.addEventListener('click', (event) => {
            for (let i = 0; i < arbrestruct.length; i++) {
                for (let j = 0; j < arbrestruct[i].length; j++) {
                    if (arbrestruct[i][j] && arbrestruct[i][j].id === this.id) {
                        // Do something with the found Tree
                        x = i;
                        y = j;
                    }
                }
            }
            addTree("down",this.button2,x,y);
        });

        this.rectangle.addEventListener('click', (event) => {
            if (action === 1) {
                console.log("Afficher");
                action = 0;
            } else if (action === 2) {
                for (let i = 0; i < arbrestruct.length; i++) {
                    for (let j = 0; j < arbrestruct[i].length; j++) {
                        if (arbrestruct[i][j] && arbrestruct[i][j].id === this.id) {
                            // Do something with the found Tree
                            x = i;
                            y = j;
                        }
                    }
                }
                addTree("right",null,x,y);
                action = 0;
            } else if (action === 3.5) {

                if (Treeparent1 && Treeparent1.id !== this.id){
                    toggleParent1TextVisibility();

                    for (let i = 0; i < arbrestruct.length; i++) {
                        for (let j = 0; j < arbrestruct[i].length; j++) {
                            if (arbrestruct[i][j] && arbrestruct[i][j].id === this.id) {
                                // Do something with the found Tree
                                w = i;
                                z = j;
                            }
                        }
                    }

                    Treeparent2 = arbrestruct[w][z];
                    Containerparent2 = containstruct[w][z];

                    console.log(`Treeparent2 =${Treeparent2.id}`);

                    var parent2Text = document.getElementById("text2");
                    parent2Text.style.display = "none";

                    // Créez un nouveau noeud
                    var node = document.createElement('div');

                    // Définissez les propriétés du noeud
                    node.style.width = '10px'; // La taille du noeud
                    node.style.height = '10px';
                    node.style.backgroundColor = 'black'; // La couleur du noeud
                    node.style.position = 'absolute'; // Pour positionner le noeud à des coordonnées spécifiques

                    // Calculez les coordonnées du noeud
                    var nodeX = ((100 + y*163.867) + (100 + z *163.867))/1.5;
                    console.log(`nodeX =${nodeX}`);
                    var nodeY = ((200 + x*191.2) + (200 + w *191.2))/1.5;
                    console.log(`nodeY =${nodeY}`);

                    // Positionnez le noeud à ces coordonnées
                    node.style.left = nodeX -4 + 'px';
                    node.style.top = nodeY -4 + 'px';

                    // Ajoutez le noeud au DOM
                    document.body.appendChild(node);

                    // Ajoutez une propriété 'isNode' au noeud pour indiquer qu'il est un noeud
                    node.isNode = true;

                    // Dessinez une ligne du noeud au rectangle de Containerparent1
                    drawLine(nodeX, nodeY, x,y);

                    // Dessinez une ligne du noeud au rectangle de Containerparent2
                    drawLine(nodeX, nodeY, w,z);

                    // Dessinez une ligne du noeud au rectangle de chaque enfant de Treeparent1
                    for (var i = 0; i < Treeparent1.childlist.length; i++) {
                        drawLine(nodeX, nodeY, x + 1, y + i);
                    }

                    // Dessinez une ligne du noeud au rectangle de chaque enfant de Treeparent2
                    for (var i = 0; i < Treeparent2.childlist.length; i++) {
                        drawLine(nodeX, nodeY, w + 1, y + i + Treeparent1.childlist.length);
                    }

                    toggleParent1TextVisibility();
                    action = 0;
                    Treeparent1 = null;
                    Treeparent2 = null;
                    Containerparent1 = null;
                    Containerparent2 = null;   
                }



            } else if (action === 3) {
                if (!Treeparent1) {
                    var parent1Text = document.getElementById("text1"); 
                    parent1Text.style.display = "none";

                    for (let i = 0; i < arbrestruct.length; i++) {
                        for (let j = 0; j < arbrestruct[i].length; j++) {
                            if (arbrestruct[i][j] && arbrestruct[i][j].id === this.id) {
                                // Do something with the found Tree
                                x = i;
                                y = j;
                            }
                        }
                    }

                    Treeparent1 = arbrestruct[x][y];
                    Containerparent1 = containstruct[x][y];

                    console.log(`Treeparent1 =${Treeparent1.id}`);

                    toggleParent2TextVisibility();
                    
                }

                action = 3.5;

            } else if (action === 4) {
                console.log("Supprimer");
                action = 0;
            }
        });

    }


}


document.addEventListener('DOMContentLoaded', (event) => {
    const beginButton = document.getElementById('begin');
    const afficherButton = document.getElementById('afficher');
    const ajouterButton = document.getElementById('ajouter');
    const modifierButton = document.getElementById('modifier');
    const supprimerButton = document.getElementById('supprimer');
    var parent1Text = document.createElement("div");
    parent1Text.style.position = "fixed";
    parent1Text.style.top = "50%";
    parent1Text.style.left = "50%";
    parent1Text.style.transform = "translate(-50%, -50%)";
    parent1Text.innerHTML = "Choisissez le premier parent (père)";
    parent1Text.id = "text1"; // Add this line to assign an id to the division
    document.body.appendChild(parent1Text);
    toggleParent1TextVisibility();

    var parent2Text = document.createElement("div");
    parent2Text.style.position = "fixed";
    parent2Text.style.top = "50%";
    parent2Text.style.left = "50%";
    parent2Text.style.transform = "translate(-50%, -50%)";
    parent2Text.innerHTML = "Choisissez le second parent (mère)";
    parent2Text.id = "text2"; // Add this line to assign an id to the division
    document.body.appendChild(parent2Text);
    toggleParent2TextVisibility();

    beginButton.addEventListener('click', function() {
        beginButton.style.display = "none";

        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.alignItems = "center"; // Add this line to center items in the container
        container.style.justifyContent = "center"; // Add this line to center items in the container vertically

        const myTree = new Tree(-1, -1, "", "", 0, treeid);
        treeid++;
        
        container.appendChild(myTree.button1);
        container.appendChild(myTree.rectangle);
        container.appendChild(myTree.inputnom);
        container.appendChild(myTree.inputprenom);
        container.appendChild(myTree.validerButton);
        container.appendChild(myTree.button2);
        
        arbrestruct[0][0] = myTree;
        containstruct[0][0] = container;

        onArbrestructChanged();

        const jimmyNeutron = document.getElementById("jimmyneutron");
        jimmyNeutron.appendChild(container);
        
    });

    afficherButton.addEventListener('click', function() {
        action = 1;
    });

    ajouterButton.addEventListener('click', function() {
        action = 2;
    });

    modifierButton.addEventListener('click', function() {
        if (parent1Text.style.display === "none") {
            toggleParent1TextVisibility();
        }
        action = 3;
    });

    supprimerButton.addEventListener('click', function() {
        action = 4;
    });
    
});





