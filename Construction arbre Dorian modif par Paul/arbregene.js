var treeid = 0;
var dist = 200;
var action = 0;
var maxchildren = 0;

var arbrestruct = [[]];
var containstruct = [[]];

var x = 0;
var y = 0;

function addTree(position, origin, x, y) {
    const parentElement = event.target.parentElement;
    
    const newTree = new Tree(-1, -1, "", "", [], treeid);
    treeid++;

    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";
    container.appendChild(newTree.button1);
    container.appendChild(newTree.rectangle);
    container.appendChild(newTree.inputnom);
    container.appendChild(newTree.inputprenom);
    container.appendChild(newTree.validerButton);
    container.appendChild(newTree.button2);
    container.appendChild(newTree.button3); // Ajout du bouton pour le frère

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
        container.style.left = `${100 + y * 200}px`;
        container.style.top = `${200 + (x-1) * 200}px`;
        console.log(`Container position: left=${100 + (y-1) * 200}px, top=${200 + x * 200}px`);

        for (let i = y + 1; i < containstruct[x-1].length; i++) {
            const currContainer = containstruct[x-1][i];
            currContainer.style.left = `${parseInt(currContainer.style.left) + 200}px`;
        }

        newTree.button1.style.display = "none";
        origin.style.display = "none";

        for (let i = 0; i < containstruct.length; i++) {
            for (let j = 0; j < containstruct[i].length; j++) {
                if (containstruct[i][j]) {
                    const container = containstruct[i][j];
                    container.style.left = `${100 + i * 200}px`;
                    container.style.top = `${200 + j * 200}px`;
                }
            }
        }

    } else if (position === "right") {

        if (arbrestruct[x][y] && arbrestruct[x][y].pere !== -1) {
            newTree.pere = arbrestruct[x][y].pere;
            newTree.button1.style.display = "none";
        }

        if (containstruct[x][y+1]) {
            for (let i = containstruct[x].length - 1; i >= y + 1; i--) {
                containstruct[x][i + 1] = containstruct[x][i];
                containstruct[x][i + 1].style.left = `${100 + (i + 1) * 200}px`;
                containstruct[x][i + 1].style.top = `${200 + x * 200}px`;
            }
            for (let i = arbrestruct[x].length - 1; i >= y + 1; i--) {
                arbrestruct[x][i + 1] = arbrestruct[x][i];
            }
        }

        arbrestruct[x][y + 1] = newTree;
        containstruct[x][y + 1] = container;

        console.log(containstruct);
        document.body.appendChild(containstruct[x][y + 1]);
        container.style.position = "absolute";
        container.style.left = `${100 + (y + 1) * 200}px`;
        container.style.top = `${200 + x * 200}px`;

    } else if (position === "down") {
        const arbrepere = arbrestruct[x][y];
        newTree.pere = arbrepere.id;

        if (!arbrestruct[x + 1]) {
            arbrestruct[x + 1] = [];
        }
        if (!containstruct[x + 1]) {
            containstruct[x + 1] = [];
        }

        for (let i = 0; i < y; i++) {
            if (!arbrestruct[x + 1][i]) {
                arbrestruct[x + 1][i] = null;
                containstruct[x + 1][i] = null;
            }
        }

        if (arbrestruct[x + 1][y] === null) {
            arbrestruct[x + 1].splice(y, 1);
            containstruct[x + 1].splice(y, 1);
        }

        let insertIndex = y;
        if (arbrestruct[x][y - 1]) {
            console.log(`pere à gauche =${arbrestruct[x][y - 1].id}`);
        }
        
        console.log(`insertIndex =${insertIndex}`);
        for (let i = y; i < arbrestruct[x + 1].length; i++) {
            console.log(`y =${y}`);
            console.log(`arbrestruct[x + 1].length =${arbrestruct[x + 1].length}`);

            if (arbrestruct[x + 1][i] && arbrestruct[x + 1][i].pere !== -1) {
                console.log(`je suis dans la boucle : pere de gauche =${arbrestruct[x + 1][i].pere}`);
                const parentIndex = arbrestruct[x + 1][i].pere;
                if (parentIndex < arbrestruct[x][y].id) {
                    insertIndex = i + 1;
                }
            }
            console.log(`insertIndex =${insertIndex}`);
        }
        arbrestruct[x + 1].splice(insertIndex, 0, newTree);
        containstruct[x + 1].splice(insertIndex, 0, container);

        console.log(containstruct);
        document.body.appendChild(container);
        container.style.position = "absolute";
        container.style.left = `${100 + insertIndex * 200}px`;
        container.style.top = `${200 + (x + 1) * 200}px`;
        console.log(`Container position: left=${100 + insertIndex * 200}px, top=${200 + (x + 1) * 200}px`);

        for (let i = insertIndex + 1; i < containstruct[x + 1].length; i++) {
            if (containstruct[x + 1][i] && containstruct[x + 1][i - 1]) {
                const currContainer = containstruct[x + 1][i];
                currContainer.style.left = `${parseInt(currContainer.style.left) + 200}px`;
            }
        }
        origin.style.display = "none";
        newTree.button1.style.display = "none";

    } else if (position === "rightSibling") {
        const currentTree = arbrestruct[x][y];
        newTree.pere = currentTree.pere;

        if (!arbrestruct[x]) {
            arbrestruct[x] = [];
        }
        if (!containstruct[x]) {
            containstruct[x] = [];
        }

        arbrestruct[x].splice(y + 1, 0, newTree);
        containstruct[x].splice(y + 1, 0, container);

        document.body.appendChild(container);
        container.style.position = "absolute";
        container.style.left = `${100 + (y + 1) * 200}px`;
        container.style.top = `${200 + x * 200}px`;

        for (let i = y + 2; i < containstruct[x].length; i++) {
            const currContainer = containstruct[x][i];
            currContainer.style.left = `${parseInt(currContainer.style.left) + 200}px`;
        }

        newTree.button3.style.display = "inline-block"; // Ensure new sibling button is visible
        origin.style.display = "inline-block";
    }
}

function reset() {
    treeid = 0;
    dist = 200;
    action = 0;
    maxchildren = 0;
    arbrestruct = [[]];
    containstruct = [[]];
    x = 0;
    y = 0;
    document.body.innerHTML = "";
}

function onArbrestructChanged() {
    for (let i = 0; i < containstruct.length; i++) {
        for (let j = 0; j < containstruct[i].length; j++) {
            const container = containstruct[i][j];
            container.style.position = "absolute";
            container.style.left = `${100 + i * 200}px`;
            container.style.top = `${200 + j * 150}px`;
            containstruct[i][j] = container;
        }
    }
}

function couplage() {
    let firstTree = null;
    let secondTree = null;

    function handleClick(event) {
        const container = event.target;
        const tree = container.tree;

        if (!firstTree) {
            firstTree = tree;
            console.log('Premier Tree sélectionné:', firstTree);
        } else if (!secondTree) {
            secondTree = tree;
            console.log('Deuxième Tree sélectionné:', secondTree);

            firstTree = null;
            secondTree = null;
        }
    }

    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        container.addEventListener('click', handleClick);
    });
}

function sendUserData(nom, prenom, imageData) {
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('prenom', prenom);
    
    if (imageData) {
        formData.append('image', imageData);
    }

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi des données :', error);
    });
}

class Tree {
    constructor(pere, mere, currentnom, currentprenom, nbchild, treebuttonid) {
        this.pere = pere;
        this.mere = mere;
        this.currentnom = currentnom;
        this.currentprenom = currentprenom;
        this.nbchild = nbchild;
        this.id = treebuttonid;

        this.validerButton = document.createElement("button");
        this.validerButton.innerHTML = "Valider";

        this.rectangle = document.createElement("div");
        this.rectangle.style.width = "40px";
        this.rectangle.style.height = "50px";
        this.rectangle.style.backgroundColor = "black";
        this.rectangle.style.marginBottom = "20px"; 
        this.rectangle.style.marginTop = "20px";
        this.rectangle.style.pointerEvents = "auto";

        this.inputnom = document.createElement("input");
        this.inputnom.type = "text";
        this.inputprenom = document.createElement("input");
        this.inputprenom.type = "text";

        this.validerButton.addEventListener('click', (event) => {
            this.inputnom.disabled = true;
            this.inputprenom.disabled = true;
            this.currentnom = this.inputnom.value;
            this.currentprenom = this.inputprenom.value;
            console.log(this.currentnom);
            console.log(this.currentprenom);
        
            sendUserData(this.currentnom, this.currentprenom, this.imageData);
        });

        this.button1 = document.createElement("button");
        this.button1.innerHTML = '<img src="ajout.png" alt="Ajouter" style="width: 30px; height: 30px;">';

        this.button2 = document.createElement("button");
        this.button2.innerHTML = '<img src="ajout.png" alt="Ajouter2" style="width: 30px; height: 30px;">';

        this.button3 = document.createElement("button");
        this.button3.innerHTML = '<img src="ajout.png" alt="Ajouter Frère" style="width: 30px; height: 30px;">';

        this.button1.addEventListener('click', (event) => {
            for (let i = 0; i < arbrestruct.length; i++) {
                for (let j = 0; j < arbrestruct[i].length; j++) {
                    if (arbrestruct[i][j] && arbrestruct[i][j].id === this.id) {
                        x = i;
                        y = j;
                    }
                }
            }
            addTree("up", this.button1, x, y);
            this.button1.style.display = "none";
        });

        this.button3.addEventListener('click', (event) => {
            for (let i = 0; i < arbrestruct.length; i++) {
                for (let j = 0; j < arbrestruct[i].length; j++) {
                    if (arbrestruct[i][j] && arbrestruct[i][j].id === this.id) {
                        x = i;
                        y = j;
                    }
                }
            }
            addTree("down", this.button2, x, y);
        });

        this.button2.addEventListener('click', (event) => {
            for (let i = 0; i < arbrestruct.length; i++) {
                for (let j = 0; j < arbrestruct[i].length; j++) {
                    if (arbrestruct[i][j] && arbrestruct[i][j].id === this.id) {
                        x = i;
                        y = j;
                    }
                }
            }
            addTree("rightSibling", this.button3, x, y);
        });

        this.rectangle.addEventListener('click', () => {
            const inputFile = document.createElement('input');
            inputFile.setAttribute('type', 'file');
            inputFile.setAttribute('accept', 'image/*');
            inputFile.addEventListener('change', () => {
                const file = inputFile.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const image = new Image();
                        image.src = e.target.result;
                        image.onload = () => {
                            this.rectangle.style.backgroundImage = `url(${image.src})`;
                            this.rectangle.style.backgroundSize = 'cover';
                            this.rectangle.style.backgroundRepeat = 'no-repeat';
                            this.rectangle.style.backgroundColor = "transparent";
                            this.imageData = file;
                        };
                    };
                    reader.readAsDataURL(file);
                }
            });
            inputFile.click();
        });
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    const beginButton = document.getElementById('begin');
    const afficherButton = document.getElementById('afficher');
    const ajouterButton = document.getElementById('ajouter');
    const modifierButton = document.getElementById('modifier');
    const supprimerButton = document.getElementById('supprimer');
    beginButton.addEventListener('click', function() {
        beginButton.style.display = "none";

        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.alignItems = "center";
        container.style.justifyContent = "center";

        const myTree = new Tree(-1, -1, "", "", 0, treeid);
        treeid++;
        
        container.appendChild(myTree.button1);
        container.appendChild(myTree.rectangle);
        container.appendChild(myTree.inputnom);
        container.appendChild(myTree.inputprenom);
        container.appendChild(myTree.validerButton);
        container.appendChild(myTree.button2);
        container.appendChild(myTree.button3); // Ajout du bouton pour le frère
        
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
        action = 3;
    });

    supprimerButton.addEventListener('click', function() {
        action = 4;
    });
});