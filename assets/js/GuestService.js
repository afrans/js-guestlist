var GuestService = {
    
    list: [],
    
    add: function(guest){
        GuestService.list.push(guest);
        GuestService.saveToLocalStorage();
    },
    
    remove: function(email){
        //TODO to implemented
        
		var list = GuestService.getList(),
		    contact;
		for (var i = 0; i < list.length; i++) {
			contact = list[i];
			if(contact.email == email) {
				list.splice(i,1);
				GuestService.saveToLocalStorage();
				return true;
			}
		}
		return false;        
    },
    
    getList: function(){
        GuestService.retrieveFromLocalStorage();
        return GuestService.list;
    },
    
    saveToLocalStorage: function () {
        var listJson = JSON.stringify(GuestService.list);
        window.localStorage.setItem('guestlist',listJson);
    },
    
    retrieveFromLocalStorage: function (){
        var listJson = window.localStorage.getItem('guestlist');
        if(listJson){
            GuestService.list = JSON.parse(listJson);
        }
    }
    
}