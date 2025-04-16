drop database Website;
create database Website;
use Website;

create table Usuarios (
	id_usuario int not null auto_increment,
    nombre_completo varchar(100) not null,
    rol int not null,
    contrasena varchar(100) not null,
    primary key(id_usuario)
)   auto_increment = 1000;
    
create table Cursos (
	id_curso int not null auto_increment,
    titulo_curso varchar(100) not null,
    categoria int default 0,
    descripcion varchar(600) default "null",
    id_instructor int not null,
    intentos_max int not null,
    primary key(id_curso),
    foreign key(id_instructor) references Usuarios(id_usuario)
);
    
create table Inscripciones (
	id_inscripcion int not null auto_increment,
    id_estudiante int not null,
    id_curso int not null,
    puntaje int default 0,
    fecha_completado datetime default (CURRENT_DATE()),
    esta_completado bool default 0,
    primary key(id_inscripcion),
    foreign key(id_estudiante) references Usuarios(id_usuario),
	foreign key(id_curso) references Cursos(id_curso)
);

create table Lecciones (
	id_leccion int not null auto_increment,
    titulo_leccion varchar(100) not null,
    contenido text not null,
    tipo_media int not null, ## 0 imagen , 1 modelo, 2 video
    url_media varchar(255) default "NA",
    id_curso int not null, 
    primary key(id_leccion),
    foreign key(id_curso) references Cursos(id_curso)
);
create table LeccionCompletada(
	id_leccion_completada int not null auto_increment,
	id_leccion int not null,
	id_usuario int not null,
	valida bool default false,
	primary key(id_leccion_completada),
	foreign key (id_leccion) references Lecciones(id_leccion),
	foreign key (id_usuario) references Usuarios (id_usuario)
	
);

create table RegistroLeccionCompletada(
    id_leccion_completada int not null,
    fecha_acabada datetime default (CURRENT_DATE()),
    foreign key(id_leccion_completada) references LeccionCompletada(id_leccion_completada)
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

create Trigger UpdateLeccionCompletada before update on LeccionCompletada
for each row 
	Begin
		if(not old.valida and new.valida) then
			insert into RegistroLeccionCompletada(id_leccion_completada) values (new.id_leccion_completada);
		end if;
	END;

create Trigger InsertIntoIncripcion after insert on Inscripciones
for each row 
	begin
		insert into LeccionCompletada (id_leccion, id_usuario, valida) 
		select id_leccion,  new.id_estudiante, 0 from Lecciones where (id_curso = new.id_curso) ;
	end;
	

insert into Usuarios (nombre_completo, rol, contrasena) values
("Romeo Juanin", 0, "123456" ),
("Romeo Mejor Juanin", 1, "123456");

insert into Cursos(titulo_curso, categoria, id_instructor, intentos_max, descripcion) values 
("Lavadoras 3", 2, 1001, 2, "curso avanzado sobre lavadoras industriales");
insert into Lecciones(titulo_leccion, contenido, tipo_media, url_media, id_curso) values
("Componentes Necesarios", "Informacion relevente, realmente relevantes, muy levenate y confidencial. Whirlpool :)", 
0, "https://www.lg.com/content/dam/channel/wcms/mx/images/lavadoras-y-secadoras/wm22vv2s6gr_asselat_enms_mx_c/gallery/DZ_01.jpg", 1),
("Verdades de la mecanica", "La mecanica puede ser muy intimidante aveces, pero recuerda ....", 1, "https://nullc.com", 1),
("Lavadoras, artefactos o ciencia", "entre las caracteristicas más importantes de las lavadoras es su capacidad de...", 1, "https://nullc.com", 1);


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

update LeccionCompletada set valida = 1 where id_leccion_completada = 1;

select * from cursos;

select* from preguntas;
select * from LeccionCompletada;
select * from RegistroLeccionCompletada;
