using System;
using System.Collections.Generic;
using System.Diagnostics.Tracing;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MyApiProyect.DTO;
using MyApiProyect.Models;


namespace MyApiProyect.Services
{

    class AlumnosService : IAlumnosService{

        private WebsiteContext _context;
        public AlumnosService(WebsiteContext context){
            _context = context;
        }

        public async Task<List<DetallesBaseAlumno>> GetAlumnos(){
            var alumnos = await _context.Usuarios.
                                Where(c=> c.Rol ==0).ToListAsync();
            return alumnos.Select(a=> new DetallesBaseAlumno{
                IdAlumno = a.IdUsuario,
                Nombre = a.NombreCompleto
            }).ToList();
        }


        public async Task<List<DetallesBaseAlumno>> GetOwnAlumnos(int id_profesor){
            var InscripcionesA = await _context.InscripcionInstructors.
                                    Include(i=> i.IdEstudianteNavigation).
                                    Where(i=> i.IdInstructor == id_profesor ).
                                    ToListAsync();
            var alumnosF = InscripcionesA.Select(i=> new DetallesBaseAlumno{
                    IdAlumno = i.IdEstudiante,
                    Nombre = i.IdEstudianteNavigation.NombreCompleto,
                    IdInscripcion = i.IdInscripcionInstructor
            }) .ToList();

            return alumnosF;
        }

        public async Task<List<DetallesBaseAlumno>> GetNotOwnAlumnos(int id_profesor){
            var Estudantes = await _context.InscripcionInstructors.
                                    Where(i=> i.IdInstructor == id_profesor).
                                    Select(i=> i.IdEstudiante).
                                    ToListAsync();
            var NotInGroup = await _context.Usuarios.
                                    Where(u=> u.Rol== 0 && !Estudantes.Contains(u.IdUsuario)).
                                    ToListAsync();
            return NotInGroup.Select(n=> new DetallesBaseAlumno{
                IdAlumno = n.IdUsuario,
                Nombre = n.NombreCompleto,
            }).ToList();
        }

        public async Task<int> AddAlumnoInscr(int id_estudiante, int id_instructor){
            var Inscripcion = new InscripcionInstructor{
                IdEstudiante = id_estudiante,
                IdInstructor = id_instructor
            };
            try{
                await _context.InscripcionInstructors.AddAsync(Inscripcion);
                await _context.SaveChangesAsync();
            }catch (Exception e)
            {
                Console.WriteLine(e);
                return -1;
            }
            return Inscripcion.IdInscripcionInstructor;
        }


        public async Task<bool> DeleteAlumnoInscr(int id_inscripcion_instructor){
            var inscr = new InscripcionInstructor{IdInscripcionInstructor = id_inscripcion_instructor};
            _context.InscripcionInstructors.Attach(inscr);
            _context.InscripcionInstructors.Remove(inscr);
            try{
                await _context.SaveChangesAsync();
            }catch(Exception e){
                Console.WriteLine(e);
                return false;
            }
            return true;

        }

    }
}