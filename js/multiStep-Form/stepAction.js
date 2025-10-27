$(document).ready(function() {
    let currentTab = 0;
    const forms = $(".form-Container");
    
    
    $(".form-Container").hide();
    $(".form-Container").eq(currentTab).show();
    $(".input-detail").hide();
    $(".form-input").hide();
    $("#form-submission").hide()
    
    // updateProgressBar();

    function showAlert(message, bgColor = "rgba(40, 167, 69, 0.3)", textColor = "#28a745", duration = 4000) {
        const $alert = $("#customAlert");

        $alert.css({
            background: bgColor,
            color: textColor,
        });
        $alert.find(".alert-message").text(message);

        $alert.addClass("show");

        setTimeout(() => {
            $alert.removeClass("show");
        }, duration);
        }



    function nextTab(){
        if (validateCurrentTab()) {
            const currentForm = $(".form-Container").eq(currentTab);
            const formId = currentForm.attr("id");
            // const activeLabel = currentForm.find(".option-block.active label").text().trim();

            // if (activeLabel) {
            //     const $preview = $(`.input-detail[data-target='${formId}']`);
            //     $preview.find("p").text(activeLabel);
            //     console.log("Selected option in current tab:", activeLabel, $preview);
            // } else {
            //     console.log("No active option selected in this tab.");
            // }

            // mapping between container and their respectively function
           const updateFunctionMap = {
            "form9-Container": updateEmploymentDetail,
            "form12-Container": updateMonthlyPayment,
            "form14-Container": updatebirthdate,
            "form15-Container": updateAccountDetail,
            "form16-Container": updateAddress,
            "form17-Container": updatePhoneNumber,
            };

            
         if (updateFunctionMap.hasOwnProperty(formId)) {
            console.log("Running function for:", formId);
            updateFunctionMap[formId](); 
        }

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

        const roundedProgress = Math.round(progress);
        if (roundedProgress >= 100) {
            $(".form-Label").text("All steps completed ");
        } 
        else {
            $(".form-Label").text(`Driving You Forward: Application Progress (${roundedProgress} ${currentTab} % Complete) `);
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
        

        if (currentTab == totalTabs -1 ) {
            $(".continueButton").text("Submit");
            
        } else {
            $(".continueButton").text("Continue");
        }

        if (currentTab === totalTabs ) {
            $(".backButton").text("Edit");
            $("#Full-form").hide();
            $(".input-detail").hide();
            $(".form-input").hide();
            $("#form-submission").show()
        } else {
            $(".backButton").text("Back");
        }
    }

    function updateCarSpecificationVisibility() {
        const carSpecContainer = $(".carSpecification-Container");
        const titleContainer = $(".title-Container");
        
        if (currentTab >= 2) { // 3rd tab (index 2)
            carSpecContainer.show();
            titleContainer.addClass("show-border");
        } else {
            carSpecContainer.hide();
            titleContainer.removeClass("show-border");
        }
    }

    // form input-title function
    
    $('.form-group input').each(function() {
        toggleLabel($(this));
    });

    $('.form-group input').on('input focus blur', function() {
        toggleLabel($(this));
    });

    function toggleLabel($input) {
        if ($input.val().trim() !== '' || $input.is(':focus')) {
        $input.prev('.input-title').addClass('active');
        $input.addClass('has-value');
        } else {
        $input.prev('.input-title').removeClass('active');
        $input.removeClass('has-value');
        }
    }

    $('.form-group input').on('blur', function() {
        const $input = $(this);
        const $error = $input.siblings('.error-text'); 

        if ($input.val().trim() === '') {
            $error.show(); 
        } else {
            $error.hide(); 
        }
    });

    $('.form-group input').on('input', function() {
        const $input = $(this);
        const $error = $input.siblings('.error-text');

        if ($input.val().trim() !== '') {
            $error.hide();
        }
    });



   
    
    // Function to validate current tab
    function validateCurrentTab() {
    const currentTabElement = $(".form-Container").eq(currentTab);
    let isValid = true;

    // 1. Validate text / email / number inputs
    currentTabElement.find("input").each(function() {
        const $input = $(this);
        const value = $input.val().trim();
        const $errorText = $input.siblings(".error-text");

        if ($input.prop('required') && value === "") {
            $errorText.show();   
            $input.addClass("input-error"); 
            isValid = false;
        } else {
            $errorText.hide();
            $input.removeClass("input-error");
        }
    });

    // 2. Validate option blocks (radio / custom selection)
    currentTabElement.find(".form-block").each(function() {
        const $block = $(this);
        if ($block.find(".option-block.active").length === 0) {
            alert("Please select an option"); 
            isValid = false;
        }
    });

    return isValid;
}

    


  
    updateButtonVisibility();
    updateCarSpecificationVisibility();


     $(".input-detail").click(function() {
        const targetId = $(this).data("target");
        const targetIndex = forms.index($("#" + targetId));
        goToTab(targetIndex)
    });
    
    $(".card-grid > div").click(function() {
        
        $(".card-grid > div").removeClass("active");
        $(this).addClass("active");
        $(".form-input").show();
        
        setTimeout(function() {nextTab();}, 300);
        const selectedImageSrc = $(".card-grid > div.active img").attr("src");
        $(".block-1 img").attr("src", selectedImageSrc);
        $("#form-submission img").attr("src", selectedImageSrc)
        const selectedVehicle = $(".card-grid > div.active h6").text() || "Car 1";
        $(".block-2 h6").text(selectedVehicle);

        $("#form1 p").text(selectedVehicle);
        $("#form1 ").show();
    });
    
    $("#budget-form > .option-block").click(function() {
        $("#budget-form > .option-block").removeClass("active");
        $(this).addClass("active");

        setTimeout(function() { nextTab(); }, 300);

        const selectedBudget = $("#budget-form > .option-block.active label").text() || "Car 1";
        $(".block-2 label").text(selectedBudget);
        $("#form2 p").text(selectedBudget);
        $("#form2").show();
    });
    
    $("#tradeIn-form> .option-block").click(function() {
        $("#tradeIn-form> .option-block").removeClass("active");
        $(this).addClass("active");

        setTimeout(function() { nextTab(); }, 300);

        const selectedTrade = $("#tradeIn-form> .option-block.active label").text() || "Car 1";

        $("#form3 p").text(selectedTrade);
        $("#form3").show();
    });
    
    $("#credit-form> .option-block").click(function() {
        $("#credit-form> .option-block").removeClass("active");
        $(this).addClass("active");

        setTimeout(function() { nextTab(); }, 300);

        const selectedCredit = $("#credit-form> .option-block.active label").text() || "Car 1";

        $("#form4 p").text(selectedCredit);
        $("#form4").show();
    });
    
    $("#employed-form> .option-block").click(function() {
        $("#employed-form> .option-block").removeClass("active");
        $(this).addClass("active");

        setTimeout(function() { nextTab(); }, 300);

        const selectedEmploy = $("#employed-form> .option-block.active label").text() || "Car 1";

        $("#form5 p").text(selectedEmploy);
        $("#form5").show();
    });

    $("#incomePeriod-form> .option-block").click(function() {
        $("#incomePeriod-form> .option-block").removeClass("active");
        $(this).addClass("active");

        setTimeout(function() { nextTab(); }, 300);

        const selectedEmploy = $("#incomePeriod-form> .option-block.active label").text() || "Car 1";

        $("#form6 p").text(selectedEmploy);
        $("#form6").show();
    });

    $("#paid-hour> .option-block").click(function() {
        $("#paid-hour> .option-block").removeClass("active");
        $(this).addClass("active");

        setTimeout(function() { nextTab(); }, 300);

        const selectedEmploy = $("#paid-hour> .option-block.active label").text() || "Car 1";

        $("#form7 p").text(selectedEmploy);
        $("#form7").show();
    });

    $("#receive-period> .option-block").click(function() {
        $("#receive-period> .option-block").removeClass("active");
        $(this).addClass("active");

        setTimeout(function() { nextTab(); }, 300);

        const selectedEmploy = $("#receive-period> .option-block.active label").text() || "Car 1";

        $("#form8 p").text(selectedEmploy);
        $("#form8").show();
    });

    function updateEmploymentDetail() {
        // Get values from form inputs
        var jobTitle = $("#job-title").val().trim();
        var companyDetail = $("#Company-detail").val().trim();

        // Update the .input-detail fields
        var $form9Detail = $("#form9");
        $form9Detail.find(".input-part").eq(0).find("p").text(jobTitle || "Not Provided");
        $form9Detail.find(".input-part").eq(1).find("p").text(companyDetail || "Not Provided");
        $form9Detail.show()
    }

    $("#living-period> .option-block").click(function() {
        $("#living-period> .option-block").removeClass("active");
        $(this).addClass("active");

        setTimeout(function() { nextTab(); }, 300);

        const selectedEmploy = $("#living-period> .option-block.active label").text() || "Car 1";

        $("#form11 p").text(selectedEmploy);
        $("#form11").show();
    });

    $("#Residence-Type> .option-block").click(function() {
        $("#Residence-Type> .option-block").removeClass("active");
        $(this).addClass("active");

        const selectedEmploy = $("#Residence-Type> .option-block.active label").text() || "Car 1";

        $("#form11 p").text(selectedEmploy);
        $("#form11").show();
    });

    function updateMonthlyPayment() {
        var monthlyPayment = $("#Monthly-payment").val().trim();

        var $form12Detail = $("#form12");
        $form12Detail.find(".input-part").eq(1).find("p").text(monthlyPayment || "Not Provided");
        $form12Detail.show()
    }

    function updatebirthdate() {
        var birthdate = $("#birth-date").val().trim();

        var $form14Detail = $("#form14");
        $form14Detail.find(".input-part").eq(1).find("p").text(birthdate || "Not Provided");
        $form14Detail.show()
    }

    function updateAccountDetail() {
        // Get values from form inputs
        var firstName = $("#first-name").val().trim();
        var lastName = $("#last-name").val().trim();
        var email = $("#Email").val().trim();

        // Update the .input-detail fields
        var $form15Detail = $("#form15");
        $form15Detail.find(".input-part").eq(0).find("p").text(firstName || "Not Provided");
        $form15Detail.find(".input-part").eq(1).find("p").text(lastName || "Not Provided");
        $form15Detail.find(".input-part").eq(2).find("p").text(email || "Not Provided");
        $form15Detail.show()
    }
    
    function updateAddress() {
        var address = $("#address").val().trim();

        var $form16Detail = $("#form16");
        $form16Detail.find(".input-part").eq(1).find("p").text(address || "Not Provided");
        $form16Detail.show()
    }
    
    function updatePhoneNumber() {
        var phoneNumber = $("#Phone-number").val().trim();

        var $form17Detail = $("#form17");
        $form17Detail.find(".input-part").eq(1).find("p").text(phoneNumber || "Not Provided");
        $form17Detail.show()
    }

    

    // sending the data through api
$(".continueButton").on("click", function(e) {
    const totalTabs = $(".form-Container").length;
    if (currentTab === totalTabs ) {
        e.preventDefault(); 

        // Collect data from all .input-detail
        var formData = {};
        $(".display-block .input-detail").each(function() {
            $(this).find(".input-part").each(function() {
                var key = $(this).find("label").text().trim().replace(/:$/, "");
                var value = $(this).find("p").text().trim();
                formData[key] = value;
            });
        });

        console.log("Data to send:", formData);

        // Send via AJAX
        $.ajax({
            url: "http://localhost:3000/forms", 
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function(response) {
                console.log("Submission successful:", response);
                showAlert("Form submitted successfully!", "#28a745", "#fff"); 
            },
            error: function(xhr, status, error) {
                console.error("Submission failed:", error);
                showAlert("Failed to submit form!", "#db2d2e", "#fff"); 
            }
        });
    } else {
        nextTab();
    }
});

});