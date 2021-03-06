var GuestController = {
    
    init: function () {
        
        GuestController.setForm();
        GuestController.showList();
    },
    
    setForm: function () {
        
        var form = document.querySelector('form');
        form.addEventListener('submit', function (event){
            GuestController.addGuest(form);
            // it is to avoid form submition
        event.preventDefault();
        });
    },
  
    addGuest: function (form) {
        var guest = {
            name:form.name.value,
            email: form.email.value
        };
        GuestService.add(guest);
        
        form.name.value = "";//add to clear name after add guest
		form.email.value = "";//add to clear email after add guest

        GuestController.addToHTML(guest);
    },                          
    
    showList: function () {
        var list = GuestService.getList();
        
        guestList = document.getElementById('guestList');//add for delete
		guestList.innerHTML = "";//add for delete
        
            list.forEach(function(guest){
            GuestController.addToHTML(guest);
            });
    },

    deleteGuest: function (email) {
        if(GuestService.remove(email)) {
			GuestController.showList();
		}
    },     
    
    addToHTML: function (guest){
      var
      guestList = document.getElementById('guestList'),
      dl = document.createElement('dl'),
      dt = GuestController.createDT(guest),
      ddName = GuestController.createDD(guest.name,'name'),
          
      deleteImg = GuestController.deleteCreateImage(guest),  
          
      ddEmail = GuestController.createDD(guest.email, 'email');
        
        ddName.appendChild(deleteImg);
        
        dl.appendChild(dt);
        dl.appendChild(ddName);
        dl.appendChild(ddEmail);
        
        guestList.appendChild(dl);
        
    },
    
    createImage: function(imageLocation) {
        
        var img = document.createElement('img');
        img.src = imageLocation;
        return img;
        
    },
    
    createDT: function(guest){
        var 
        dt = document.createElement('dt'),
        hash = md5(guest.email),    
        img = GuestController.createImage('http://www.gravatar.com/avatar/' + hash);
        dt.appendChild(img);
        dt.className = "photo";
        return dt;
    },
    
    createDD: function(value, className){
        
        var dd = document.createElement('dd');
        
        dd.innerHTML = value;
        dd.className = className;
        
        return dd;
    },
    
    deleteCreateImage: function (guest){
        
      var deleteImg = GuestController.createImage("assets/images/delete.gif");
      deleteImg.setAttribute('data-email', guest.email);
        deleteImg.addEventListener('click', function() {
			//if(confirm("Are you sure to delete " + guest.email)) {
				GuestController.deleteGuest(deleteImg.getAttribute('data-email'));
                //event.preventDefault();
			//}			
		});
       return deleteImg; 
    }
    
};

//initialization

GuestController.init();