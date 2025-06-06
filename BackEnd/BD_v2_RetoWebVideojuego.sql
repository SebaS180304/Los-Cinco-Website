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
    descripcion text default null,
    id_instructor int not null,
    intentos_max int not null,
    visible bool default false not null,
    primary key(id_curso),
    foreign key(id_instructor) references Usuarios(id_usuario)
);

create table InscripcionInstructor(
	id_inscripcion_instructor int not null auto_increment,
	id_estudiante int not null ,
	id_instructor int not null,
	primary key (id_inscripcion_instructor),
	foreign key (id_estudiante) references Usuarios(id_usuario),
	foreign key (id_instructor) references Usuarios(id_usuario)	
);
    
create table InscripcionCurso (
	id_inscripcion_curso int not null auto_increment,
    id_estudiante int not null,
    id_curso int not null,
    puntaje int default 0 not null,
    intento int default 0 not null,
    valido bool default false not null,
    fecha_terminado dateTime default null,
    primary key(id_inscripcion_curso),
    foreign key(id_estudiante) references Usuarios(id_usuario),
	foreign key(id_curso) references Cursos(id_curso)
);

create table QuizSubmition(
	id_submition int not null auto_increment,
	id_inscripcion_curso int not null,
	fecha_submition datetime default (Current_Date()),
	calificacion int not null,
	primary key (id_submition),
	foreign key (id_inscripcion_curso) references InscripcionCurso(id_inscripcion_curso)

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
    id_leccion_completada int not null auto_increment,
    fecha_acabada datetime not null default (CURRENT_DATE()),
    foreign key(id_leccion_completada) references LeccionCompletada(id_leccion_completada)
);

create table PreguntaLeccion(
	id_pregunta_leccion int not null auto_increment,
	id_leccion int not null,
	texto_pregunta varchar (100) default "null" not null,
	primary key(id_pregunta_leccion),
	foreign key (id_leccion) references Lecciones(id_leccion)
);

create table OpcionLeccion(
	id_opcion_leccion int not null auto_increment,
	id_pregunta_leccion int not null,
	texto_opcion varchar (100) default "null" not null,
	correcto bool default false not null,
	primary key(id_opcion_leccion),
	foreign key(id_pregunta_leccion) references PreguntaLeccion(id_pregunta_leccion)
);



create table Preguntas (
	id_pregunta int not null auto_increment,
    texto_pregunta varchar(100) default "NA",
    id_curso int not null,
    primary key(id_pregunta),
    foreign key(id_curso) references Cursos(id_curso)
);

create table Opciones (
	id_opcion int not null auto_increment,
    texto_opcion varchar(100) not null,
    id_pregunta int not null,
    correcta bool default 1,
    primary key(id_opcion),
    foreign key(id_pregunta) references Preguntas(id_pregunta)
);
#----------------------------------------------Update-----------------------------#
##cuando se registra una completada
delimiter //
create Trigger UpdateLeccionCompletada before update on LeccionCompletada
for each row 
	Begin
		if(not old.valida and new.valida) then
			insert into RegistroLeccionCompletada(id_leccion_completada) values
					(new.id_leccion_completada);
		end if;
	END;
delimiter //
###reseteo de curso
create trigger ResetCurso before update on InscripcionCurso
for each row
begin
	declare MaxInt int;
	declare cal int;
	select intentos_max into MaxInt from Cursos where id_curso = old.id_curso;
	if(old.intento != new.intento and new.intento > MaxInt and new.puntaje < 50) then
		set new.intento = 0;
		update LeccionCompletada set valida = false where id_usuario = old.id_estudiante 
        and id_leccion in (
            select id_leccion 
            from Lecciones 
            where id_curso = old.id_curso
        );
	end if;
end;
#--------------------------------------Insert--------------------------------------#



####insert Alumno into leccionesCompletadas after inscripcion curso
delimiter $$
create Trigger InsertIntoInscripcionLeccion after insert on InscripcionCurso
for each row 
	begin
		declare Nlecc int ;
		select Count(*) into Nlecc from Lecciones where id_curso = new.id_curso;
		if Nlecc > 0 then
			insert into LeccionCompletada (id_leccion, id_usuario, valida) 
			select id_leccion,  new.id_estudiante, 0 from Lecciones where (id_curso = new.id_curso) ;
		end if;
	end;
delimiter $$	
####insert alumno into InscripcionCursos after Inscripcion Instructor
delimiter $$
create Trigger InsertIntoInscripcionCurso after insert on InscripcionInstructor
for each row
	begin	
		declare Ncurs int ;
		select Count(*) into Ncurs from Cursos where id_instructor = new.id_instructor;
		if(Ncurs > 0) then
			insert into InscripcionCurso (id_estudiante, id_curso) 
			select new.id_estudiante, id_curso from Cursos where (id_instructor = new.id_instructor);
		end if;
	end;
delimiter $$
#### insert inscripionCurso after insert into cursos
delimiter @@
create trigger InsertCursosToAlumnos after insert on Cursos
for each row 
begin
	insert into InscripcionCurso (id_estudiante, id_curso)
	select id_estudiante, new.id_curso from InscripcionInstructor where (id_instructor = new.id_instructor);
end;
delimiter @@
## insert after new leccion into leccion completada
delimiter $$
create trigger InsertLeccionToAlumnos after insert on Lecciones
for each row 
begin
	insert into LeccionCompletada (id_leccion, id_usuario)
	select new.id_leccion, id_estudiante from InscripcionCurso where new.id_curso = id_curso;
end;

delimiter $$

delimiter //
#### modify puntaje e intento  curso after quiz submition
create trigger InsertIntoSubmition after insert on QuizSubmition
for each row 
begin	
	declare lastCal int;
	select puntaje into lastCal from InscripcionCurso 
			where (id_inscripcion_curso = new.id_inscripcion_curso);
	
	update InscripcionCurso set intento = intento +1 
					where id_inscripcion_curso = new.id_inscripcion_curso;
	if new.calificacion > lastCal then
		update InscripcionCurso set puntaje = new.calificacion 
						where id_inscripcion_curso = new.id_inscripcion_curso;
	end if;
end;
delimiter //
#---------------------------------------------delete-------------------------------------#

##delete alumno from instructor
delimiter $$
create trigger deleteInscripcionCursosAlumno
		before delete on InscripcionInstructor
for each row
begin 
	delete from InscripcionCurso where (id_curso in (select id_curso from Cursos
												where old.id_instructor = id_instructor ) 
								and old.id_estudiante = id_estudiante);
end;
delimiter $$

delimiter @@
## delete InscripcionCurso in each alumno after delete curso
create trigger deleteInscripcionCursoAlumnos before delete on Cursos
for each row 
begin
	delete from InscripcionCurso where (id_curso = old.id_curso);
	delete from Preguntas where (id_curso = old.id_curso);
	delete from Lecciones where (id_curso = old.id_curso);
end;

delimiter @@
delimiter $$
## delete from Preguntas leccion before delete lecciones
create trigger deletePreguntasLecciones before delete on Lecciones
for each row 
begin
	delete from LeccionCompletada where (id_leccion = old.id_leccion);
	delete from PreguntaLeccion where (id_leccion = old.id_leccion);
end;
delimiter $$
## delete opciones before preguntas en lecciones
delimiter @@
create trigger deleteOpcionesLecciones before delete on PreguntaLeccion
for each row 
begin
	delete from OpcionLeccion where (id_pregunta_leccion = old.id_pregunta_leccion);
end;

delimiter @@

## delite opciones before preguntas en quiz
delimiter $$

create trigger deleteOpciones before delete on Preguntas
for each row 
begin
	delete from Opciones where (id_pregunta = old.id_pregunta);
end;


delimiter $$

## delete leccionCompletadas and QuizSubmitions before delete inscripcion curso
delimiter //
create trigger deleteInscripcionSubmitionAndLecciones
			before delete on InscripcionCurso
for each row
begin
	delete from LeccionCompletada where old.id_estudiante = id_usuario and id_leccion in 
											(select id_leccion from Lecciones where id_curso = old.id_curso);
	delete from QuizSubmition where id_inscripcion_curso = old.id_inscripcion_curso;
end;
delimiter //
delimiter @@
## delete registros despues de leccioneCompletada
create trigger deleteRegistrosLecciones 
			before delete on LeccionCompletada
for each row 
begin
	delete from RegistroLeccionCompletada where old.id_leccion_completada = id_leccion_completada;
end;
delimiter @@

#----------------------------------------MiniDB-----------------------------------#

delimiter //

insert into Usuarios (nombre_completo, rol, contrasena) values
("Romeo Juanin", 0, "123456" ),
("Otro Alumno", 0, "abcde"),
	("Romeo Mejor Juanin", 1, "123456"),
	("Otro Instructor", 1, "abcde"),
("Rolando", 1, "1234"),
("Roberto",  1, "1234"),
("Benjamin",  1, "1234"),
("Jesus Carlos", 1, "1234"),
("Luisa", 1, "1234"),
	("Rolando", 0, "1234"),
	("Roberto", 0, "1234"),
	("Benjamin",  0, "1234"),
	("Jesus Carlos",  0, "1234"),
	("Luisa", 0, "1234"),
("Diego", 0, "1234"),
("Efrain", 0, "1234"),
("Bruno", 0, "1234"),
("Victor", 0, "1234"),
	("Diego", 1, "1234"),
	("Efrain", 1, "1234"),
	("Bruno", 1, "1234"),
	("Victor", 1, "1234"),
("Jaime", 0, "1234"),
("Admin", 0, "1234"),
	("Jaime", 1, "1234"),
	("Admin", 1, "1234");

delimiter //

delimiter @@
insert into InscripcionInstructor ( id_estudiante, id_instructor) values
(1017, 1019);
delimiter @@
delimiter $$
insert into Cursos(titulo_curso, categoria, id_instructor, intentos_max, descripcion, visible) values 
("Lavadoras 3", 2, 1019, 2, "Curso avanzado sobre lavadoras industriales", TRUE );
delimiter $$








