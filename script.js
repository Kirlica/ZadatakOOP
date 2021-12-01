//funkcionalni prototipovi (klase)

function Osoba(ime, prezime) {
    this.ime = ime || "";
    this.prezime = prezime || "";
};

Osoba.prototype.izvjesce = function() {
    return `Ja sam ${this.ime} ${this.prezime}. Volim sve sto vole mladi`
};

Student.prototype = new Osoba();

function Student(ime, prezime) {
    Osoba.call(this, ime, prezime);
    this.upisaniKolegiji = [];
    this.polozeniKolegiji = [];
};

Student.prototype.prijaviIspit = function(kolegij) {
    kolegij.listaStudenataPrijaviliIspit.push(this);
};

Student.prototype.izvjesce = function() {
    return `Ja sam student ${this.ime} ${this.prezime}. Upisao sam ${this.upisaniKolegiji.join(', ')}, a polozio sam ${this.polozeniKolegiji.join(', ')}.`
};

Profesor.prototype = new Osoba();

function Profesor(ime, prezime) {
    Osoba.call(this, ime, prezime);
    this.listaKolegija = [];
};

Profesor.prototype.ocijeniIspit = function(student, kolegij) {
    kolegij.polozio(student);
};

Profesor.prototype.izvjesce = function() {
    return `Ja sam profesor ${this.ime} ${this.prezime} i predajem ${this.listaKolegija.join(', ')}.`
};

function Kolegij(imeKolegija, imeProfesora) {
    this.imeKolegija = imeKolegija;
    this.imeProfesora = imeProfesora;
    this.listaStudenata = [];
    this.listaStudenataPrijaviliIspit = [];
    this.listaStudentaPolozili = [];
};

Kolegij.prototype.upisiStudenta = function(student) {
    this.listaStudenata.push(student);
    student.upisaniKolegiji.push(this.imeKolegija);
};

Kolegij.prototype.polozio = function(student) {
    var index = this.listaStudenataPrijaviliIspit.indexOf(student);
    if (index > -1) {
        this.listaStudenataPrijaviliIspit.splice(index, 1);
    } else {
        return `${student.ime} ${student.prezime} nije prijavio ispit!`
    };
    var index = this.listaStudenata.indexOf(student);
    if (index > -1) {
        this.listaStudenata.splice(index, 1);
    };
   this.listaStudentaPolozili.push(student);
   var indexKolegij = student.upisaniKolegiji.indexOf(this.imeKolegija);
   if (indexKolegij > -1) {
       student.upisaniKolegiji.splice(indexKolegij, 1);
   }
   student.polozeniKolegiji.push(this.imeKolegija);
};

Kolegij.prototype.izvjesce = function() {
    var imenaStudenata = [];
    for (i=0; i < this.listaStudenata.length; i++) {
        var student = this.listaStudenata[i];
        var ime = `${student.ime} ${student.prezime}`;
        imenaStudenata.push(ime);
    }
    var imenaStudenataPolozili = [];
    for (i=0; i < this.listaStudentaPolozili.length; i++) {
        var student = this.listaStudentaPolozili[i];
        var ime = `${student.ime} ${student.prezime}`;
        imenaStudenataPolozili.push(ime);
    }
    return `Ime kolegija: ${this.imeKolegija},\nIme profesora: ${this.imeProfesora},\nBroj upisanih studenata: ${this.listaStudenata.length},\nImena upisanih: ${imenaStudenata.join(', ')},\nImena studenata koji su polozili: ${imenaStudenataPolozili.join(', ')}.`
};


var profesor1 = new Profesor('Zlatko', 'Dalic');
var student1 = new Student('Sime', 'Vrsaljko');
var student2 = new Student('Luka', 'Modric');
var student3 = new Student('Bruno', 'Petkovic');
var kolegij1 = new Kolegij('matematika', 'Zlatko Dalic');

kolegij1.upisiStudenta(student1);
kolegij1.upisiStudenta(student2);
kolegij1.upisiStudenta(student3);
console.log(kolegij1);
student2.prijaviIspit(kolegij1);
kolegij1.polozio(student2);
console.log(student2);
console.log(kolegij1);
console.log(kolegij1.izvjesce());
console.log(student2);