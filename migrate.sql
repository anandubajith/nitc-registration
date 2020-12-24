insert into due_entity("rollNumber", "amount","type", "updatedDate")
                values
                    ( 'B180288CS', 0, 'library', NOW() ),
                    ( 'B180288CS', 123, 'hostel' ,NOW() ),
                    ( 'B180672CS', 124, 'library', NOW() ),
                    ( 'B180672CS', 1230, 'hostel', NOW() ),
                    ( 'B180318CS', 0, 'library' ,NOW() ),
                    ( 'B180318CS', 0, 'hostel' ,NOW() ),
                    ( 'B180644CS', 33333, 'library' ,NOW() ),
                    ( 'B180644CS', -23, 'hostel' ,NOW() ),
                    ( 'B180291CS', -123, 'library' ,NOW() ),
                    ( 'B180291CS', -23, 'hostel' ,NOW() );

insert into user_entity("username","name", "email", "password", "role", "contactNumber","semester" , "department", "category" )
                values
                    ('B180288CS', 'Anandu B Ajith', 'mail@anandu.net', '$2b$12$1c.him1xTJ7kRdekdLpcG.3fTEgN.c8gGCpiQfYbevEo1icDnngve', 'user', '9497389579', 'VI', 'Computer Science', 'General'),
                    ('B180672CS', 'Aswin Muraleedharan Ulanat', 'ashwin@example.com', '$2b$12$1c.him1xTJ7kRdekdLpcG.3fTEgN.c8gGCpiQfYbevEo1icDnngve', 'user', '4444', 'VI', 'Computer Science', 'General'),
                    ('B180318CS', 'Hemanth V', 'hemanth@example.net', '$2b$12$1c.him1xTJ7kRdekdLpcG.3fTEgN.c8gGCpiQfYbevEo1icDnngve', 'user', '789', 'VI', 'Computer Science', 'General'),
                    ('B180644CS', 'Isaac Peter Alappat', 'isaac@example.com', '$2b$12$1c.him1xTJ7kRdekdLpcG.3fTEgN.c8gGCpiQfYbevEo1icDnngve', 'user', '456', 'VI', 'Computer Science', 'General'),
                    ('B180291CS', 'Rohith Prakash', 'rohit@example.com', '$2b$12$1c.him1xTJ7kRdekdLpcG.3fTEgN.c8gGCpiQfYbevEo1icDnngve', 'user', '123', 'VI', 'Computer Science', 'General');


insert into payment_entity("transactionId", "amount", "paymentDate", "bank", "modeOfPayment", "updated_at")
                values
                    ('TXN123', '64646', '24/12/2020', 'SBI', 'online', NOW()),
                    ('TXN423', '64646', '24/12/2020', 'SBI', 'online', NOW()),
                    ('TXN623', '64646', '24/12/2020', 'SBI', 'online', NOW()),
                    ('TXN923', '64646', '24/12/2020', 'SBI', 'online', NOW()),
                    ('TXN023', '64646', '24/12/2020', 'SBI', 'online', NOW());

insert into verification_entity(updated_at)
                values 
                    (NOW()),(NOW()),(NOW()),(NOW()),(NOW());

insert into application_entity(status, submission_date, "ownerId", "paymentId", "verifiedBy","verificationStatusId") 
                        values('pending', NOW(), 1,1,1,1), ('pending', NOW(), 2,2,2,2), ('pending', NOW(),3,3,3,3), ('pending', NOW(),4 ,4,4,4);


insert into user_entity("username","name", "email", "password", "role", "contactNumber","semester" , "department", "category" )
                values
                    ('fa_1@nitc.ac.in', 'John Doe', 'fa_1@nitc.ac.in', '$2b$12$1c.him1xTJ7kRdekdLpcG.3fTEgN.c8gGCpiQfYbevEo1icDnngve', 'fa', '9497389579', '', 'Computer Science', 'General'),
                     ('fa_2@nitc.ac.in', 'Jane Doe', 'fa_2@nitc.ac.in', '$2b$12$1c.him1xTJ7kRdekdLpcG.3fTEgN.c8gGCpiQfYbevEo1icDnngve', 'fa', '9497389579', '', 'Computer Science', 'General'),
                      ('fa_3@nitc.ac.in', 'Tony', 'fa_3@nitc.ac.in', '$2b$12$1c.him1xTJ7kRdekdLpcG.3fTEgN.c8gGCpiQfYbevEo1icDnngve', 'fa', '9497389579', '', 'Computer Science', 'General');

insert into user_entity("username","name", "email", "password", "role", "contactNumber","semester" , "department", "category" )
                values
                    ('student_1@nitc.ac.in', 'Student1', 'student_1@nitc.ac.in', '$2b$12$1c.him1xTJ7kRdekdLpcG.3fTEgN.c8gGCpiQfYbevEo1icDnngve', 'sac_admin', '9497389579', '', 'Computer Science', 'General');

insert into user_entity("username","name", "email", "password", "role", "contactNumber","semester" , "department", "category" )
                values
                    ('academic@nitc.ac.in', 'Student1', 'academic@nitc.ac.in', '$2b$12$1c.him1xTJ7kRdekdLpcG.3fTEgN.c8gGCpiQfYbevEo1icDnngve', 'academic_admin', '9497389579', '', '', '');

insert into user_entity("username","name", "email", "password", "role", "contactNumber","semester" , "department", "category" )
                values
                    ('library@nitc.ac.in', 'LibraryAdmin', 'library@nitc.ac.in', '$2b$12$1c.him1xTJ7kRdekdLpcG.3fTEgN.c8gGCpiQfYbevEo1icDnngve', 'library_admin', '9497389579', '', '', '');

insert into user_entity("username","name", "email", "password", "role", "contactNumber","semester" , "department", "category" )
                values
                    ('hostel@nitc.ac.in', 'HostelAdmin', 'hostel@nitc.ac.in', '$2b$12$1c.him1xTJ7kRdekdLpcG.3fTEgN.c8gGCpiQfYbevEo1icDnngve', 'hostel_admin', '9497389579', '', '', '');