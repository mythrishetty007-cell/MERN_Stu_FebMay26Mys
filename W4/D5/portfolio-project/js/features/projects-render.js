function renderProjects(){
    const projectsContainer = document.getElementById("projects-container");

    if(!projectsContainer){
         console.log("Projects container not found");
        return;   
    }
    
    projectsContainer.innerHTML = "";
    projectsData.forEach(function(project){
    
      //create outer card
        const card = document.createElement("div");
        card.className = "p-8 text-center bg-white rounded-3xl shadow-lg transition-all duration-500 hover:shadow-2xl";

        //create icon
        const iconBox = document.createElement("div");
        iconBox.className = "w-20 h-20 mx-auto mb-4 bg-purple-900 rounded-2xl flex item-center justify-center";
        
        //create icon text
        const iconText = document.createElement("span");
        iconText.className = "text-2xl text-white font-bold text-center justify-center mt-5";
        iconText.textContent = project.id;
        
        //Put icon text inside icon box
        iconBox.appendChild(iconText);

        // create project name 
        const projectName = document.createElement("h3");
        projectName.className = "text-2xl font-bold mb-2";
        projectName.textContent = project.name;

        //create project category
        const projectCategory = document.createElement("span");
        projectCategory.className = "text-lg font-semibold mb-3";
        projectCategory.textContent = project.category;

        //create project desc
        const projectDescription = document.createElement("p");
        projectDescription.className = "text-sm mb-5";
        projectDescription.textContent = project.description;

        //create project technologies
        const projectTechnologies = document.createElement("span");
        projectTechnologies.className = "px-3 py-1 text-xs font-bold rounded-full justify-center bg-blue-100 text-blue-900";
        projectTechnologies.textContent = project.technologies;

        //create project status
        const projectStatus = document.createElement("span");
        projectStatus.classList = "text-xs font-bold uppercase rounded bg-yellow-100 text-emarald-600 mr-2 text-center justify-center";
        projectStatus.textContent = project.status; 

        // Append all child elements to card
        card.appendChild(iconBox);
        card.appendChild(projectName);
        card.appendChild(projectCategory);
        card.appendChild(projectDescription);
        card.appendChild(projectStatus);
        card.appendChild(projectTechnologies);
       

        //Append card to skills container
        projectsContainer.appendChild(card);
    });
    console.log("Projects rendered successfully");
}