using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyApiProyect.DTO;
using MyApiProyect.Models;

namespace MyApiProyect.Services
{
    public class QuestionService:IQuestionService
    {
        private readonly WebsiteContext context;
        public QuestionService(WebsiteContext _websiteContext)
        {
            context = _websiteContext;
        }
        public async Task<List<PreguntaDTO>?> GetQuizPreguntas(int id_curso)
        {
            var quizQuery = await context.Preguntas.Where(x => x.IdCurso == id_curso).ToListAsync();
            if(quizQuery == null || quizQuery.Count == 0)
            {
                return null;
            }   
            var quiz = quizQuery.Select(x => new PreguntaDTO
            {
                IdPregunta = x.IdPregunta,
                Texto = x.TextoPregunta,
                opciones = context.Opciones.
                            Where(y => y.IdPregunta == x.IdPregunta).
                            Select(y => new OpcionDTO
                            {
                                IdOpcion = y.IdOpcion,
                                Texto = y.TextoOpcion,
                                correcta = y.Correcta ?? false
                            }).ToList()
            }
            ).ToList();
            return quiz;
        }

        public async Task<bool> ModificarQuizFinal (List<PreguntaDTO> questions, int id_curso){
            var elim = await context.Preguntas.Where(p=> id_curso ==p.IdCurso ).ToListAsync();
            context.RemoveRange(elim);
            var preg = questions.Select(p=> new Pregunta{
                    IdCurso = id_curso,
                    TextoPregunta = p.Texto ?? "na",
                    Opciones = p.opciones.Select(o=> new Opcione{
                        IdOpcion = o.IdOpcion,
                        TextoOpcion = o.Texto ?? "na",
                        Correcta = o.correcta
                    }).ToList() ?? new List<Opcione>()
            }).ToList();
            context.AddRange(preg);
            try{
                await context.SaveChangesAsync();
                return true;
            }catch(Exception e){
                Console.WriteLine(e);
                return false;
            }
        }

        public async Task<List<PreguntaDTO>>GetLeccionPreguntas (int id_leccion){
            var preguntas = await context.PreguntaLeccions.
                                Include(c=>c.OpcionLeccions).
                                Where(l=>l.IdLeccion == id_leccion).
                                ToListAsync();

            var Result = preguntas.Select(p=> new PreguntaDTO{
                IdPregunta = p.IdPreguntaLeccion,
                Texto = p.TextoPregunta,
                opciones = p.OpcionLeccions.Select(o=> new OpcionDTO{
                                        IdOpcion = o.IdOpcionLeccion,
                                        Texto = o.TextoOpcion
                                    }).ToList()
            }).ToList();

            return Result;   
        }


        public async Task<bool> ModificarLeccionQuiz(List<PreguntaDTO> questions, int id_leccion){

            var elim = await context.PreguntaLeccions.Where(p=> id_leccion ==p.IdLeccion ).ToListAsync();
            context.RemoveRange(elim);
            var preg = questions.Select(p=> new PreguntaLeccion{
                    IdLeccion = id_leccion,
                    TextoPregunta = p.Texto ?? "na",
                    OpcionLeccions = p.opciones.Select(o=> new OpcionLeccion{
                        IdOpcionLeccion = o.IdOpcion,
                        TextoOpcion = o.Texto ?? "na",
                        Correcto = o.correcta
                    }).ToList() ?? new List<OpcionLeccion>()
            }).ToList();
            context.AddRange(preg);
            try{
                await context.SaveChangesAsync();
                return true;
            }catch(Exception e){
                Console.WriteLine(e);
                return false;
            }
                                    
        }

        public async Task<bool> SubmitionLeccion(int id_leccion, int id_alumno){
            var leccionA = await context.LeccionCompletada.Where(l=>l.IdLeccion == id_leccion && l.IdUsuario == id_alumno).FirstOrDefaultAsync();
            if (leccionA is null) return false;
                leccionA.Valida = true;
            try{
                await context.SaveChangesAsync();
            }catch (Exception e){
                Console.WriteLine(e);
                return false;
            }
            return true;

        }

        public async Task<bool> SubmitQuiz(int id_curso, int id_alumno, int cal){
            var Insc = await context.InscripcionCursos.Where(i=>i.IdCurso == id_curso && i.IdEstudiante == id_alumno).
                                                Select(i=>i.IdInscripcionCurso).
                                                FirstOrDefaultAsync();
            var sub = new QuizSubmition{
                IdInscripcionCurso = Insc,
                Calificacion = cal
            };
            context.Add(sub);
            try{
                await context.SaveChangesAsync();
            }catch (Exception e){
                Console.WriteLine(e);
                return false;
            }
            return true;
        }


    }
}