$(document).ready(function() {
    let currentTab = 0;
    const forms = $(".form-Container");
    
    
    $(".form-Container").hide();
    $(".form-Container").eq(currentTab).show();
    $(".input-detail").hide();
    $(".form-input").hide();
    
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
            $(".form-Label").text("All steps completed ");
        } 
        else {
            $(".form-Label").text(`Driving You Forward: Application Progress (${roundedProgress}% Complete) `);
        }
    }
    
    // button visibility function
    function updateButtonVisibility() {
        const totalTabs = $(".form-Container").length;
        
        if (currentTab === 0) {
            $("#prevBtn").hide();            
        } else {
            $("#prevBtn").show();
        }
        
        if (currentTab === totalTabs) {
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


     $(".input-detail").click(function() {
        const targetId = $(this).data("target");
        const targetIndex = forms.index($("#" + targetId));
        goToTab(targetIndex)
        $('.input-detail input[type="radio"]').prop('checked', false);
        $(this).find('input[type="radio"]').prop('checked', true);
    });

     $('.Radio-Block').click(function() {
        $('.Radio-Block input[type="radio"]').prop('checked', false);
        $(this).find('input[type="radio"]').prop('checked', true).change();
    });

    

    
    $(".card-grid > div").click(function() {
        
        $(".card-grid > div").removeClass("active");
        $(this).addClass("active");
        $(".form-input").show();
        
        setTimeout(function() {nextTab();}, 300);
        const selectedImageSrc = $(".card-grid > div.active img").attr("src");
        $(".block-1 img").attr("src", selectedImageSrc);
        const selectedVehicle = $(".card-grid > div.active h6").text() || "Car 1";
        $(".block-2 h6").text(selectedVehicle);

        $("#form1 p").text(selectedVehicle);
        $("#form1 ").show();
    });

    $("input[name='budget']").change(function() {
        if ($(this).is(':checked')){
            setTimeout(function() {
                nextTab();
            }, 300);
            const selectedBudget = $("input[name='budget']:checked").val() || "Under $400 / Month";
             $(".block-2 label").text(selectedBudget);
            $("#form2 p").text(selectedBudget);
            $("#form2 ").show();
        }
    });

    $("input[name='tradeIn-status']").change(function() {
        if ($(this).is(':checked')){
            setTimeout(function() {
                nextTab();
            }, 300);
            const selectedStatus = $("input[name='tradeIn-status']:checked").val() || "Under $400 / Month";
            $("#form3 p").text(selectedStatus);
            $("#form3").show();
        }
    });

    $("input[name='credit']").change(function() {
        if ($(this).is(':checked')){
            setTimeout(function() {
                nextTab();
            }, 300);
            const selectedCredit = $("input[name='credit']:checked").val() || "Under $400 / Month";
            $("#form4 p").text(selectedCredit);
            $("#form4").show();
        }
    });

    $("input[name='employment-status']").change(function() {
        if ($(this).is(':checked')){
            setTimeout(function() {
                nextTab();
            }, 300);
            const selectedEmployment = $("input[name='employment-status']:checked").val() || "Under $400 / Month";
            $("#form5 p").text(selectedEmployment);
            $("#form5").show();
        }
    });

    $("input[name='income-details']").change(function() {
        if ($(this).is(':checked')){
            setTimeout(function() {
                nextTab();
            }, 300);
            const selectedIncomeType = $("input[name='income-details']:checked").val() || "Under $400 / Month";
            $("#form6 p").text(selectedIncomeType);
            $("#form6").show();
        }
    });

});