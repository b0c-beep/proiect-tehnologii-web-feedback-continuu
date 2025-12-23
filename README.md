# **Tema 6 - Aplicatie web pentru acordarea de feedback continuu** 

### Echipa: Team Boc 
### Membri: Boc Mario-Adrian & Bucur Ioana Rebecca 

---

## **Functionalitati minime**
* ### *Profesor*
    * Autentificare simpla de tip register/login
    * Profesorul poate defini activitati: titlu, durata, dupa creare se primeste un cod unic
    * Activitatea este adaugata intr-un dashboard cu toate activitatile active sau trecute ale profesorului respectiv
    * O activitate poate fi pornita si devine accesibila prin cod, pentru durata specificata (activitatea poate fi dezactivata de profesor oricand)
    * Feedback-ul primit in timpul activitatilor este salvat in baza de date, se ofera statistici pe baza acestora, cu posibilitatea de exportare a datelor in Excel

* ### *Student*
    * Autentificare anonima, nu e nevoie de cont, studentul introduce codul de acces pentru o activitate existenta si activa
    * In timpul activitatii, ecranul este impartit in patru cadrane, fiecare cu un emoticon asociat (😊, 😢, 😮, 😕), la click pe emoticon, este trimis un eveniment catre backend, feedbackul apare la profesor (pot fi trimise oricate emoticoane)

* ### *Dashboard feedback (Profesor)*
    * Vizualizare live a feedback-ului, contoare prezente pentru fiecare emoticon
    * Este disponibila o distributie cronologica a emoticoanelor de-alungul timpului + statistici, cum ar fi minute la care au fost primite cele mai multe reactiia sau export de date


## **Functionalitati optionale**
* Pe langa emoticoane, studentii pot lasa mesaje anonime in chat
* Trimiterea unui mail generat automat profesorului cu raportul activitatii terminate (prin intermediul API-ului extern Resend)


## **Tehnologii**
* Frontend: Javascript + React
* Backend: Node.js + Express
* Baza de date: PostgreSql
* ORM: Sequelize


## **Plan de implementare**
* ***Faza 0** - Creare proiect, adaugare colaboratori, detaliere specificatii, realizarea designului orientativ in Figma*

* ***Faza 1** - Realizarea serviciului REST, implementare minima a interfetei grafice*

* ***Faza 2** - Implementare totala a interfetei grafice, demo complet + deployment pe server*

* ***Faza 3** - Implementare functionalitati optionale*

* ***Faza 4** - Prezentare proiect*



    
