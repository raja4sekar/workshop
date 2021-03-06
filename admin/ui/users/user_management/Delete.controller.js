sap.ui.controller("user_management.Delete", {


/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
*/
//   onInit: function() {
//
//   },

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
*/
//   onBeforeRendering: function() {
//
//   },

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
*/
//   onAfterRendering: function() {
//
//   },

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
*/
//   onExit: function() {
//
//   }

	onDeleteUsers: function(oController){

		sap.ui.commons.MessageBox.confirm('Are you sure you want to delete these users?',
				 function(bResult){oController.deleteConfirm(bResult, oController); },
				 "Deletion Confirmation" );   
	},
	
	 //Creation Confirmation Dialog Results
	 deleteConfirm: function(bResult,oController){
		 if(bResult){ 
			 var aUrl = '/workshop/admin/services/workshopUsers.xsjs?cmd=deleteUsers';
				var oRoles = sap.ui.getCore().byId("rolesList");
				
			 var jsonBody = {};
			 var items = {};
			 jsonBody["user"] = sap.ui.getCore().byId("DUserNamePattern").getValue();
			 jsonBody["number"] = sap.ui.getCore().byId("DnumUsers").getValue();
			 
			
			 sap.ui.getCore().byId("txtDLog").setValue("");	
			 sap.ui.core.BusyIndicator.show();			 
			 jQuery.ajax({
			       url: aUrl,
			       data: JSON.stringify(jsonBody),
			       processData: false,
			       type: 'PUT',
			       dataType: 'text',
			       success: function(myTxt){
			          	  oController.onDeleteSuccess(myTxt); },
			       error: oController.onErrorCall });
		 }
	 },
	 
	 //Deletion Successful Event Handler
	 onDeleteSuccess: function(myTxt){
	     sap.ui.core.BusyIndicator.hide();		 
		 sap.ui.getCore().byId("txtDLog").setValue(myTxt);		
	 },

     onErrorCall: function(jqXHR, textStatus, errorThrown){
    	 sap.ui.core.BusyIndicator.hide();	    	 
   	  if(jqXHR.status == '500'){
	    		 sap.ui.commons.MessageBox.show(jqXHR.responseText, 
	    				 "ERROR",
	    				 "Service Call Error" );	
	    		return;	
   	  }
   	  else{
		         sap.ui.commons.MessageBox.show(jqXHR.statusText, 
	    				 "ERROR",
	    				 "Service Call Error" );	
	    		return;	
   	  }
   	}

});
