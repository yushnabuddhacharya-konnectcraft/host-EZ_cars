$(document).ready(function() {
    let currentTab = 0;
    
    $(".form-Container").hide();
    $(".form-Container").eq(currentTab).show();
    
    updateProgressBar();

    function nextTab(){
        if (validateCurrentTab()) {
            $(".form-Container").eq(currentTab).hide();            
            currentTab++;            
            $(".form-Container").eq(currentTab).show();            
            updateProgressBar();            
            updateButtonVisibility();
            updateCarSpecificationVisibility();
        }
    }
    
    $(".continueButton").click(function() { nextTab()});

    function prevTab(){
        $(".form-Container").eq(currentTab).hide();
        
        currentTab--;        
        $(".form-Container").eq(currentTab).show();
        
        updateProgressBar();        
        updateButtonVisibility();
        updateCarSpecificationVisibility();
    }
    
    $(".backButton").click(function() { prevTab()});

    function goToTab(tabIndex) {
        $(".form-Container").eq(currentTab).hide();
        
        currentTab = tabIndex;
        
        $(".form-Container").eq(currentTab).show();
        
        updateProgressBar();
        updateButtonVisibility();
        updateCarSpecificationVisibility();
    }
    
    // Function to update progress bar
    function updateProgressBar() {
        const totalTabs = $(".form-Container").length;
        const progress = ((currentTab + 1) / totalTabs) * 100;
        $("#progressBar").css("width", progress + "%");
    }
    
    // Function to update button visibility
    function updateButtonVisibility() {
        const totalTabs = $(".form-Container").length;
        
        // Show/hide back button
        if (currentTab === 0) {
            $("#prevBtn").hide();
        } else {
            $("#prevBtn").show();
        }
        
        // Update continue button text on last tab
        if (currentTab === totalTabs - 1) {
            $(".continueButton").text("Submit");
        } else {
            $(".continueButton").text("Continue");
        }
    }

    function updateCarSpecificationVisibility() {
        const carSpecContainer = $(".carSpecification-Container");
        const titleContainer = $(".title-Container");
        
        if (currentTab >= 2) { // 3rd tab (index 2)
            carSpecContainer.show();
            titleContainer.addClass("show-border");
            updateCarSpecification();
        } else {
            carSpecContainer.hide();
            titleContainer.removeClass("show-border");
        }
    }

    function updateCarSpecification() {
        const selectedVehicle = $(".card-grid > div.active h6").text() || "Car 1";
        const selectedBudget = $("input[name='budget']:checked").val() || "Under $400 / Month";
        $(".block-2 h6").text(selectedVehicle);
        $(".block-2 label").text(selectedBudget);
    }
    
    // Function to validate current tab
    function validateCurrentTab() {
        const currentTabElement = $(".form-Container").eq(currentTab);
        
        if (currentTab === 0) {
            // validation and other function
            return true;
        }
        
        if (currentTab === 1) {
            if (!$("input[name='budget']:checked").val()) {
                alert("Please select a budget option");
                return false;
            }
            return true;
        }
        
        return true; 
    }
    
    updateButtonVisibility();
    updateCarSpecificationVisibility();
    
    $(".card-grid > div").click(function() {
        console.log("Card clicked!"); 
        
        $(".card-grid > div").removeClass("active");
        $(this).addClass("active");
        
        console.log("Active class added to:", $(this).find("h6").text()); 
        setTimeout(function() {nextTab();}, 300);
    });


    $(".block-3 a").click(function(e) {
        e.preventDefault();
        goToTab(0)
    });

    $("input[name='budget']").click(function() {
            setTimeout(function() {
                nextTab();
            }, 300);
    });

    $("input[name='tradeIn-status']").click(function() {
            setTimeout(function() {
                nextTab();
            }, 300);
    });

    $("input[name='credit']").click(function() {
            setTimeout(function() {
                nextTab();
            }, 300);
    });

    $("input[name='employment-status']").click(function() {
            setTimeout(function() {
                nextTab();
            }, 300);
    });

    $("input[name='income-details']").click(function() {
            setTimeout(function() {
                nextTab();
            }, 300);
    });

});