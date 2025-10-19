$(document).ready(function() {
    let currentTab = 0;
    
    
    $(".form-Container").hide();
    $(".form-Container").eq(currentTab).show();
    $(".input-detail").hide();
    
    // updateProgressBar();

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
    
    // progress bar function
    function updateProgressBar() {
        const totalTabs = $(".form-Container").length;
        const progress = ((currentTab) / totalTabs) * 100;
        $("#progressBar").css("width", progress + "%");
        $(".progress-percent").text(Math.round(progress) + "%" );

        const roundedProgress = Math.round(progress);
        if (roundedProgress >= 100) {
            $(".form-Label").text("All steps completed 🎉");
        } 
        else {
            $(".form-Label").text(`Almost there — ${roundedProgress}% complete`);
        }
    }
    
    // button visibility function
    function updateButtonVisibility() {
        const totalTabs = $(".form-Container").length;
        
        if (currentTab === 0) {
            $("#prevBtn").hide();
            $(".form-input").hide();
        } else {
            $("#prevBtn").show();
            $(".form-input").show();

        }
        
        if (currentTab === totalTabs - 1) {
            $(".continueButton").text("Submit");
        } else {
            $(".continueButton").text("Continue");
        }

        if (currentTab === totalTabs ) {
            $(".backButton").text("Edit");
            $("#nextBtn").hide();
        } else {
            $(".backButton").text("Back");
            $("#nextBtn").show();
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
            return true;        }
        
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


    // map live preview with form    
    $(".input-detail").click(function() {

    const targetForm = $(this).data("target");

    $("#" + targetForm).show();

    // Optional: highlight clicked preview
    $(".input-detail").removeClass("active");
    $(this).addClass("active");
});

    
    $(".card-grid > div").click(function() {
        console.log("Card clicked!"); 
        
        $(".card-grid > div").removeClass("active");
        $(this).addClass("active");
        
        console.log("Active class added to:", $(this).find("h6").text()); 
        setTimeout(function() {nextTab();}, 300);
        const selectedVehicle = $(".card-grid > div.active h6").text() || "Car 1";
        $("#form1 p").text(selectedVehicle);
        $("#form1 ").show();
    });

    $("input[name='budget']").click(function() {
        setTimeout(function() {
            nextTab();
        }, 300);
        const selectedBudget = $("input[name='budget']:checked").val() || "Under $400 / Month";
        $("#form2 p").text(selectedBudget);
        $("#form2 ").show();
    });

    $("input[name='tradeIn-status']").click(function() {
        setTimeout(function() {
            nextTab();
        }, 300);
        const selectedStatus = $("input[name='tradeIn-status']:checked").val() || "Under $400 / Month";
        $("#form3 p").text(selectedStatus);
        $("#form3").show();
    });

    $("input[name='credit']").click(function() {
        setTimeout(function() {
            nextTab();
        }, 300);
        const selectedCredit = $("input[name='credit']:checked").val() || "Under $400 / Month";
        $("#form4 p").text(selectedCredit);
        $("#form4").show();
    });

    $("input[name='employment-status']").click(function() {
        setTimeout(function() {
            nextTab();
        }, 300);
        const selectedEmployment = $("input[name='employment-status']:checked").val() || "Under $400 / Month";
        $("#form5 p").text(selectedEmployment);
        $("#form5").show();
    });

    $("input[name='income-details']").click(function() {
        setTimeout(function() {
            nextTab();
        }, 300);
        const selectedIncomeType = $("input[name='income-details']:checked").val() || "Under $400 / Month";
        $("#form6 p").text(selectedIncomeType);
        $("#form6").show();
    });

});