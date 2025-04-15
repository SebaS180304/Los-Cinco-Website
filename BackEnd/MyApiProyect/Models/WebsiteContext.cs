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

    public virtual DbSet<Inscripcione> Inscripciones { get; set; }

    public virtual DbSet<LeccionAprendidum> LeccionAprendida { get; set; }

    public virtual DbSet<Leccione> Lecciones { get; set; }

    public virtual DbSet<LeccionesCompletada> LeccionesCompletadas { get; set; }

    public virtual DbSet<Opcione> Opciones { get; set; }

    public virtual DbSet<Pregunta> Preguntas { get; set; }

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
                .HasMaxLength(600)
                .HasColumnName("descripcion");
            entity.Property(e => e.IdInstructor).HasColumnName("id_instructor");
            entity.Property(e => e.IntentosMax).HasColumnName("intentos_max");
            entity.Property(e => e.TituloCurso)
                .HasMaxLength(100)
                .HasColumnName("titulo_curso");

            entity.HasOne(d => d.IdInstructorNavigation).WithMany(p => p.Cursos)
                .HasForeignKey(d => d.IdInstructor)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("cursos_ibfk_1");
        });

        modelBuilder.Entity<Inscripcione>(entity =>
        {
            entity.HasKey(e => e.IdInscripcion).HasName("PRIMARY");

            entity.HasIndex(e => e.IdCurso, "id_curso");

            entity.HasIndex(e => e.IdEstudiante, "id_estudiante");

            entity.Property(e => e.IdInscripcion).HasColumnName("id_inscripcion");
            entity.Property(e => e.EstaCompletado).HasColumnName("esta_completado");
            entity.Property(e => e.FechaCompletado)
                .HasColumnType("datetime")
                .HasColumnName("fecha_completado");
            entity.Property(e => e.IdCurso).HasColumnName("id_curso");
            entity.Property(e => e.IdEstudiante).HasColumnName("id_estudiante");
            entity.Property(e => e.Puntaje).HasColumnName("puntaje");

            entity.HasOne(d => d.IdCursoNavigation).WithMany(p => p.Inscripciones)
                .HasForeignKey(d => d.IdCurso)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("inscripciones_ibfk_2");

            entity.HasOne(d => d.IdEstudianteNavigation).WithMany(p => p.Inscripciones)
                .HasForeignKey(d => d.IdEstudiante)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("inscripciones_ibfk_1");
        });

        modelBuilder.Entity<LeccionAprendidum>(entity =>
        {
            entity.HasKey(e => e.IdLeccionAprendida).HasName("PRIMARY");

            entity.HasIndex(e => e.IdLeccion, "id_leccion");

            entity.HasIndex(e => e.IdUsuario, "id_usuario");

            entity.Property(e => e.IdLeccionAprendida).HasColumnName("id_leccion_aprendida");
            entity.Property(e => e.FechaAcabada)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("fecha_acabada");
            entity.Property(e => e.IdLeccion).HasColumnName("id_leccion");
            entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");

            entity.HasOne(d => d.IdLeccionNavigation).WithMany(p => p.LeccionAprendida)
                .HasForeignKey(d => d.IdLeccion)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("leccionaprendida_ibfk_1");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.LeccionAprendida)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("leccionaprendida_ibfk_2");
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
                .HasColumnName("url_media");

            entity.HasOne(d => d.IdCursoNavigation).WithMany(p => p.Lecciones)
                .HasForeignKey(d => d.IdCurso)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("lecciones_ibfk_1");
        });

        modelBuilder.Entity<LeccionesCompletada>(entity =>
        {
            entity.HasKey(e => e.IdLeccionCompletada).HasName("PRIMARY");

            entity.ToTable("Lecciones_Completadas");

            entity.HasIndex(e => e.IdLeccion, "id_leccion");

            entity.HasIndex(e => e.IdUsuario, "id_usuario");

            entity.Property(e => e.IdLeccionCompletada).HasColumnName("id_leccion_completada");
            entity.Property(e => e.FechaAcabada)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("fecha_acabada");
            entity.Property(e => e.IdLeccion).HasColumnName("id_leccion");
            entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");

            entity.HasOne(d => d.IdLeccionNavigation).WithMany(p => p.LeccionesCompletada)
                .HasForeignKey(d => d.IdLeccion)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("lecciones_completadas_ibfk_1");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.LeccionesCompletada)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("lecciones_completadas_ibfk_2");
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
                .HasConstraintName("opciones_ibfk_1");
        });

        modelBuilder.Entity<Pregunta>(entity =>
        {
            entity.HasKey(e => e.IdPregunta).HasName("PRIMARY");

            entity.HasIndex(e => e.IdQuiz, "id_quiz");

            entity.Property(e => e.IdPregunta).HasColumnName("id_pregunta");
            entity.Property(e => e.IdQuiz).HasColumnName("id_quiz");
            entity.Property(e => e.TextoPregunta)
                .HasMaxLength(100)
                .HasDefaultValueSql("'NA'")
                .HasColumnName("texto_pregunta");

            entity.HasOne(d => d.IdQuizNavigation).WithMany(p => p.Pregunta)
                .HasForeignKey(d => d.IdQuiz)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("preguntas_ibfk_1");
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
