using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace MyApiProyect.Models;

public partial class WebsiteContext : DbContext
{
    public WebsiteContext()
    {
    }

    public WebsiteContext(DbContextOptions<WebsiteContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Curso> Cursos { get; set; }

    public virtual DbSet<InscripcionCurso> InscripcionCursos { get; set; }

    public virtual DbSet<InscripcionInstructor> InscripcionInstructors { get; set; }

    public virtual DbSet<LeccionCompletadum> LeccionCompletada { get; set; }

    public virtual DbSet<Leccione> Lecciones { get; set; }

    public virtual DbSet<OpcionLeccion> OpcionLeccions { get; set; }

    public virtual DbSet<Opcione> Opciones { get; set; }

    public virtual DbSet<Pregunta> Preguntas { get; set; }

    public virtual DbSet<PreguntaLeccion> PreguntaLeccions { get; set; }

    public virtual DbSet<QuizSubmition> QuizSubmitions { get; set; }

    public virtual DbSet<RegistroLeccionCompletadum> RegistroLeccionCompletada { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Curso>(entity =>
        {
            entity.HasKey(e => e.IdCurso).HasName("PRIMARY");

            entity.HasIndex(e => e.IdInstructor, "id_instructor");

            entity.Property(e => e.IdCurso).HasColumnName("id_curso");
            entity.Property(e => e.Categoria)
                .HasDefaultValueSql("'0'")
                .HasColumnName("categoria");
            entity.Property(e => e.Descripcion)
                .HasColumnType("text")
                .HasColumnName("descripcion");
            entity.Property(e => e.IdInstructor).HasColumnName("id_instructor");
            entity.Property(e => e.IntentosMax).HasColumnName("intentos_max");
            entity.Property(e => e.TituloCurso)
                .HasMaxLength(100)
                .HasColumnName("titulo_curso");
            entity.Property(e => e.Visible).HasColumnName("visible");

            entity.HasOne(d => d.IdInstructorNavigation).WithMany(p => p.Cursos)
                .HasForeignKey(d => d.IdInstructor)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Cursos_ibfk_1");
        });

        modelBuilder.Entity<InscripcionCurso>(entity =>
        {
            entity.HasKey(e => e.IdInscripcionCurso).HasName("PRIMARY");

            entity.ToTable("InscripcionCurso");

            entity.HasIndex(e => e.IdCurso, "id_curso");

            entity.HasIndex(e => e.IdEstudiante, "id_estudiante");

            entity.Property(e => e.IdInscripcionCurso).HasColumnName("id_inscripcion_curso");
            entity.Property(e => e.FechaTerminado)
                .HasColumnType("datetime")
                .HasColumnName("fecha_terminado");
            entity.Property(e => e.IdCurso).HasColumnName("id_curso");
            entity.Property(e => e.IdEstudiante).HasColumnName("id_estudiante");
            entity.Property(e => e.Intento).HasColumnName("intento");
            entity.Property(e => e.Puntaje).HasColumnName("puntaje");
            entity.Property(e => e.Valido).HasColumnName("valido");

            entity.HasOne(d => d.IdCursoNavigation).WithMany(p => p.InscripcionCursos)
                .HasForeignKey(d => d.IdCurso)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("InscripcionCurso_ibfk_2");

            entity.HasOne(d => d.IdEstudianteNavigation).WithMany(p => p.InscripcionCursos)
                .HasForeignKey(d => d.IdEstudiante)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("InscripcionCurso_ibfk_1");
        });

        modelBuilder.Entity<InscripcionInstructor>(entity =>
        {
            entity.HasKey(e => e.IdInscripcionInstructor).HasName("PRIMARY");

            entity.ToTable("InscripcionInstructor");

            entity.HasIndex(e => e.IdEstudiante, "id_estudiante");

            entity.HasIndex(e => e.IdInstructor, "id_instructor");

            entity.Property(e => e.IdInscripcionInstructor).HasColumnName("id_inscripcion_instructor");
            entity.Property(e => e.IdEstudiante).HasColumnName("id_estudiante");
            entity.Property(e => e.IdInstructor).HasColumnName("id_instructor");

            entity.HasOne(d => d.IdEstudianteNavigation).WithMany(p => p.InscripcionInstructorIdEstudianteNavigations)
                .HasForeignKey(d => d.IdEstudiante)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("InscripcionInstructor_ibfk_1");

            entity.HasOne(d => d.IdInstructorNavigation).WithMany(p => p.InscripcionInstructorIdInstructorNavigations)
                .HasForeignKey(d => d.IdInstructor)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("InscripcionInstructor_ibfk_2");
        });

        modelBuilder.Entity<LeccionCompletadum>(entity =>
        {
            entity.HasKey(e => e.IdLeccionCompletada).HasName("PRIMARY");

            entity.HasIndex(e => e.IdLeccion, "id_leccion");

            entity.HasIndex(e => e.IdUsuario, "id_usuario");

            entity.Property(e => e.IdLeccionCompletada).HasColumnName("id_leccion_completada");
            entity.Property(e => e.IdLeccion).HasColumnName("id_leccion");
            entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");
            entity.Property(e => e.Valida)
                .HasDefaultValueSql("'0'")
                .HasColumnName("valida");

            entity.HasOne(d => d.IdLeccionNavigation).WithMany(p => p.LeccionCompletada)
                .HasForeignKey(d => d.IdLeccion)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("LeccionCompletada_ibfk_1");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.LeccionCompletada)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("LeccionCompletada_ibfk_2");
        });

        modelBuilder.Entity<Leccione>(entity =>
        {
            entity.HasKey(e => e.IdLeccion).HasName("PRIMARY");

            entity.HasIndex(e => e.IdCurso, "id_curso");

            entity.Property(e => e.IdLeccion).HasColumnName("id_leccion");
            entity.Property(e => e.Contenido)
                .HasColumnType("text")
                .HasColumnName("contenido");
            entity.Property(e => e.IdCurso).HasColumnName("id_curso");
            entity.Property(e => e.TipoMedia).HasColumnName("tipo_media");
            entity.Property(e => e.TituloLeccion)
                .HasMaxLength(100)
                .HasColumnName("titulo_leccion");
            entity.Property(e => e.UrlMedia)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NA'")
                .HasColumnName("url_media");

            entity.HasOne(d => d.IdCursoNavigation).WithMany(p => p.Lecciones)
                .HasForeignKey(d => d.IdCurso)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Lecciones_ibfk_1");
        });

        modelBuilder.Entity<OpcionLeccion>(entity =>
        {
            entity.HasKey(e => e.IdOpcionLeccion).HasName("PRIMARY");

            entity.ToTable("OpcionLeccion");

            entity.HasIndex(e => e.IdPreguntaLeccion, "id_pregunta_leccion");

            entity.Property(e => e.IdOpcionLeccion).HasColumnName("id_opcion_leccion");
            entity.Property(e => e.Correcto).HasColumnName("correcto");
            entity.Property(e => e.IdPreguntaLeccion).HasColumnName("id_pregunta_leccion");
            entity.Property(e => e.TextoOpcion)
                .HasMaxLength(100)
                .HasDefaultValueSql("'null'")
                .HasColumnName("texto_opcion");

            entity.HasOne(d => d.IdPreguntaLeccionNavigation).WithMany(p => p.OpcionLeccions)
                .HasForeignKey(d => d.IdPreguntaLeccion)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("OpcionLeccion_ibfk_1");
        });

        modelBuilder.Entity<Opcione>(entity =>
        {
            entity.HasKey(e => e.IdOpcion).HasName("PRIMARY");

            entity.HasIndex(e => e.IdPregunta, "id_pregunta");

            entity.Property(e => e.IdOpcion).HasColumnName("id_opcion");
            entity.Property(e => e.Correcta)
                .HasDefaultValueSql("'1'")
                .HasColumnName("correcta");
            entity.Property(e => e.IdPregunta).HasColumnName("id_pregunta");
            entity.Property(e => e.TextoOpcion)
                .HasMaxLength(100)
                .HasColumnName("texto_opcion");

            entity.HasOne(d => d.IdPreguntaNavigation).WithMany(p => p.Opciones)
                .HasForeignKey(d => d.IdPregunta)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Opciones_ibfk_1");
        });

        modelBuilder.Entity<Pregunta>(entity =>
        {
            entity.HasKey(e => e.IdPregunta).HasName("PRIMARY");

            entity.HasIndex(e => e.IdCurso, "id_curso");

            entity.Property(e => e.IdPregunta).HasColumnName("id_pregunta");
            entity.Property(e => e.IdCurso).HasColumnName("id_curso");
            entity.Property(e => e.TextoPregunta)
                .HasMaxLength(100)
                .HasDefaultValueSql("'NA'")
                .HasColumnName("texto_pregunta");

            entity.HasOne(d => d.IdCursoNavigation).WithMany(p => p.Pregunta)
                .HasForeignKey(d => d.IdCurso)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Preguntas_ibfk_1");
        });

        modelBuilder.Entity<PreguntaLeccion>(entity =>
        {
            entity.HasKey(e => e.IdPreguntaLeccion).HasName("PRIMARY");

            entity.ToTable("PreguntaLeccion");

            entity.HasIndex(e => e.IdLeccion, "id_leccion");

            entity.Property(e => e.IdPreguntaLeccion).HasColumnName("id_pregunta_leccion");
            entity.Property(e => e.IdLeccion).HasColumnName("id_leccion");
            entity.Property(e => e.TextoPregunta)
                .HasMaxLength(100)
                .HasDefaultValueSql("'null'")
                .HasColumnName("texto_pregunta");

            entity.HasOne(d => d.IdLeccionNavigation).WithMany(p => p.PreguntaLeccions)
                .HasForeignKey(d => d.IdLeccion)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("PreguntaLeccion_ibfk_1");
        });

        modelBuilder.Entity<QuizSubmition>(entity =>
        {
            entity.HasKey(e => e.IdSubmition).HasName("PRIMARY");

            entity.ToTable("QuizSubmition");

            entity.HasIndex(e => e.IdInscripcionCurso, "id_inscripcion_curso");

            entity.Property(e => e.IdSubmition).HasColumnName("id_submition");
            entity.Property(e => e.Calificacion).HasColumnName("calificacion");
            entity.Property(e => e.FechaSubmition)
                .HasDefaultValueSql("curdate()")
                .HasColumnType("datetime")
                .HasColumnName("fecha_submition");
            entity.Property(e => e.IdInscripcionCurso).HasColumnName("id_inscripcion_curso");

            entity.HasOne(d => d.IdInscripcionCursoNavigation).WithMany(p => p.QuizSubmitions)
                .HasForeignKey(d => d.IdInscripcionCurso)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("QuizSubmition_ibfk_1");
        });

        modelBuilder.Entity<RegistroLeccionCompletadum>(entity =>
        {
            entity.HasNoKey();

            entity.HasIndex(e => e.IdLeccionCompletada, "id_leccion_completada");

            entity.Property(e => e.FechaAcabada)
                .HasDefaultValueSql("curdate()")
                .HasColumnType("datetime")
                .HasColumnName("fecha_acabada");
            entity.Property(e => e.IdLeccionCompletada)
                .ValueGeneratedOnAdd()
                .HasColumnName("id_leccion_completada");

            entity.HasOne(d => d.IdLeccionCompletadaNavigation).WithMany()
                .HasForeignKey(d => d.IdLeccionCompletada)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("RegistroLeccionCompletada_ibfk_1");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("PRIMARY");

            entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");
            entity.Property(e => e.Contrasena)
                .HasMaxLength(100)
                .HasColumnName("contrasena");
            entity.Property(e => e.NombreCompleto)
                .HasMaxLength(100)
                .HasColumnName("nombre_completo");
            entity.Property(e => e.Rol).HasColumnName("rol");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
