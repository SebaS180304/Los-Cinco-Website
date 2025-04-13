drop database website;
create database website;
use website;

create table Usuarios (
	id_usuario int not null auto_increment,
    nombre_completo varchar(100) not null,
    rol int not null,
    contrasena varchar(100),
    primary key(id_usuario)
)   auto_increment = 1000;
    
create table Cursos (
	id_curso int not null auto_increment,
    titulo_curso varchar(100) not null,
    categoria varchar(100),
    id_instructor int not null,
    intentos_max int not null,
    primary key(id_curso),
    foreign key(id_instructor) references Usuarios(id_usuario)
);
    
create table Inscripciones (
	id_inscripcion int not null auto_increment,
    id_estudiante int not null,
    id_curso int not null,
    puntaje int,
    fecha_completado datetime ,
    esta_completado bool,
    primary key(id_inscripcion),
    foreign key(id_estudiante) references Usuarios(id_usuario),
	foreign key(id_curso) references Cursos(id_curso)
);

create table Lecciones (
	id_leccion int not null auto_increment,
    titulo_leccion varchar(100) not null,
    contenido text not null,
    tipo_media varchar(100) not null,
    url_media varchar(255),
    id_curso int not null,
    primary key(id_leccion),
    foreign key(id_curso) references Cursos(id_curso)
);
create table Lecciones_Completadas(
    id_leccion_completada int not null auto_increment,
    id_leccion int not null,
    id_usuario int not null,
    terminado bool default false,
    fecha_acabada timestamp default CURRENT_TIMESTAMP,
    primary key(id_leccion_completada),
    foreign key(id_leccion) references Lecciones(id_leccion)
);


create table Preguntas (
	id_pregunta int not null auto_increment,
    texto_pregunta varchar(100) default "NA",
    id_quiz int not null,
    primary key(id_pregunta),
    foreign key(id_quiz) references Cursos(id_curso)
);

create table Opciones (
	id_opcion int not null auto_increment,
    texto_opcion varchar(100) not null,
    id_pregunta int not null,
    correcta bool default 1,
    primary key(id_opcion),
    foreign key(id_pregunta) references Preguntas(id_pregunta)
);

insert into Usuarios (nombre_completo, rol, contrasena) values
("Romeo Juanin", 0, "123456" ),
("Romeo Mejor Juanin", 1, "123456");

insert into Cursos(titulo_curso, categoria, id_instructor, intentos_max) values 
("Lavadoras 3", "electronica", 1001, 2);

insert into Inscripciones ( id_estudiante, id_curso) values
(1000,1);

insert into Preguntas (texto_pregunta, id_quiz) values 
("¿Cuales son las mejores opciones para lavadoras?", 1 ),
("Cuales electrodomesticos son los más peligrosos de instalar erroneamente?", 1);

insert into Opciones(texto_opcion, id_pregunta, correcta) values 
("Whirlpool", 		1, 1),
("Samsung", 		1 ,0),
("LG", 				1, 0),
("Lavadoras",		2, 0),
("Secadoras",		2, 1),
("Refrigeradores", 	2, 0),
("Horno", 			2, 1);
select * from cursos;

select* from preguntas;