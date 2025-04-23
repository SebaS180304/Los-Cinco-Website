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

        public async Task<List<PreguntaDTO>> GetLeccionPregunta(int id_leccion){
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
            Console.WriteLine("elim");
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
            Console.WriteLine("add");
            try{
                await context.SaveChangesAsync();
                return true;
            }catch(Exception e){
                Console.WriteLine(e);
                return false;
            }
                                    
        }


    }
}