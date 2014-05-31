function viewModel() {
    var self = this;

    this.tabs = ko.observableArray([
        { img: 'styles/img/keypad.png', name: 'Keypad', id: 0 },
        { img: 'styles/img/logs.png', name: 'Logs', id: 1 },
        { img: 'styles/img/contacts.png', name: 'Contacs', id: 2},
        { img: 'styles/img/favourites.png', name: 'Favourites', id: 3},
        { img: 'styles/img/groups.png', name: 'Groups', id: 4}
    ]);

    this.key = ko.observableArray([
        {number: '1', letters: '@'},
        {number: '2', letters: 'ABC'},
        {number: '3', letters: 'DEF'},
        {number: '4', letters: 'GHI'},
        {number: '5', letters: 'JKL'},
        {number: '6', letters: 'MNO'},
        {number: '7', letters: 'PQRS'},
        {number: '8', letters: 'TUV'},
        {number: '9', letters: 'WXYZ'},
        {number: '*', letters: 'P'},
        {number: '0', letters: '+'},
        {number: '#', letters: '&'}
    ]);

    this.contacts = ko.observableArray([
        {name: "Narine", number: 37493592909 },
        {name: "John", number: 18185487025},
        {name: "Vahe", number: 89465242432},
        {name: "Narek", number: 37493458900},
        {name: "Max", number: 33565365346},
        {name: "Aghasi", number: 37454654664},
        {name: "Diego", number: 37452091234},
        {name: "Elvis", number: 67893452200},
        {name: "Michael", number: 34535345365},
        {name: "George", number: 22478795785},
        {name: "Poghos", number: 37498888888},
        {name: "Paul", number: 27346697896},
        {name: "Lia", number: 37453645647},
        {name: "Hrant", number: 37455336663}
    ]);

    this.buttons = ko.observableArray([
        {name: 'Create'},
        {name: 'Edit'},
        {name: 'Delete'}
    ]);

    this.currentTab = ko.observable(this.tabs()[2]);

    this.changeTab = function (tab) {
        self.currentTab(tab);
    }

    this.currentNumber = ko.observable('');

    this.pushNumber = function (obj) {
        self.currentNumber(self.currentNumber() + obj.number);
    }

    this.removeNumber = function () {
        self.currentNumber(self.currentNumber().slice(0, -1));
    }

    this.matchContacts = ko.computed(function () {
        var arr = [];
        ko.utils.arrayForEach(self.contacts(), function (item) {
            if (item.number.toString().indexOf(self.currentNumber()) >= 0) {
                if (self.currentNumber().length != 0) {
                    arr.push(item);
                }
            }
        })
        return arr;
    }, this);

    this.firstMatchContact = ko.computed(function () {
        return self.matchContacts()[0] || {};
    });

    this.showC = ko.observable(false);
    this.hideC = ko.observable(true);

    this.showOrHide = function () {
        if (self.showC()) {
            self.showC(false);
            self.hideC(true);
        } else {
            self.showC(true);
            self.hideC(false);
        }
    }

    this.markedItem = ko.observable('');

    this.markedContact = function(markedC){
        self.markedItem(markedC);
    }

    this.edit = function(choosedButton){
//        debugger;
        if(choosedButton.name == 'Delete'){
           self.contacts.remove(self.markedItem);
        }
    }
}

ko.applyBindings(new viewModel());
