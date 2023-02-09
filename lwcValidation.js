import { LightningElement, track } from 'lwc';

export default class LwcValidation extends LightningElement {
    @track errors={
        "FirstName":"Please Enter the FirstName",
        "LastName":"Please Enter the LastName",
        "CreditCardNumber":"Please Enter a Valid Card Number"
    };

    @track value = 'cardType';
    @track cardValue;

    get options() {
        return [
            { label: 'Card Type', value: 'cardType' },
            { label: 'Visa', value: 'visa' },
            { label: 'Master Card', value: 'masterCard' },
            { label: 'Discover', value: 'discover' },
            { label: 'American Express', value: 'americanExpress' },
        ];
    }

    handleInputChange(event) {
        this.cardValue = event.detail.value;
        var firstChar = this.cardValue.charAt(0);
        
        this.cardValue = this.cardValue.split("-").join(""); // remove hyphens
        if (this.cardValue.length > 0) {
            this.cardValue = this.cardValue.match(new RegExp('.{1,4}', 'g')).join("-");
        }

        if(firstChar == 3) {
            this.template.querySelector('.cardNumber').maxLength = 18;
        } else {
            this.template.querySelector('.cardNumber').maxLength = 19;
        }

        var visaRegEx = "^4[0-9]{12}(?:[0-9]{3})?$";
        var mastercardRegEx = "^5[1-5][0-9]{14}$";
        var amexpRegEx = "^3[47][0-9]{13}$";
        var discovRegEx = "^6(?:011|5[0-9]{2})[0-9]{12}$";
        let cardValueNew = this.cardValue.split("-").join(""); 
        if (cardValueNew.match(visaRegEx)) {
            this.value = 'visa';
        } else if(cardValueNew.match(mastercardRegEx)) {
            this.value = 'masterCard';
        } else if(cardValueNew.match(amexpRegEx)) {
            this.value = 'americanExpress';
        } else if(cardValueNew.match(discovRegEx)) {
            this.value = 'discover';
        } else {
            this.value ='cardType';
        }
    }
    
    handleChange(event) {
        this.value = event.detail.value;
    
        if (this.value == 'visa' || this.value == 'masterCard' || this.value == 'discover' || this.value == 'cardType') {
            this.template.querySelector('.cardNumber').maxLength = 19;
        } else {
            this.template.querySelector('.cardNumber').maxLength = 18;
        } 
    }
    
    handleValidation(){
        this.template.querySelectorAll("lightning-input").forEach(item => {
            let val = item.value;
            let label = item.label;
            if(val != "") {
                item.setCustomValidity("");
            } else {
                item.setCustomValidity(this.errors[label]);
            }
            item.reportValidity();
        });
    }
}
