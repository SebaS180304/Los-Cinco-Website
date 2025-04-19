import videoPrueba from '../../assets/videos/video-prueba.mp4';
import imagenPrueba from '../../assets/images/imagen-prueba.jpg';

export const lecture_data = [
    {
        id: 1,
        title: 'Lección 1',
        subtitle: 'Tema 1',
        mediaType: 'model3d',
        src: '/computer/computer.gltf',
        content: `Contenido de la Lección <br/>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde
                    fugit veniam eius, perspiciatis sunt? Corporis qui ducimus quibusdam,
                    aliquam dolore excepturi quae. Distinctio enim at eligendi perferendis in
                    cum quibusdam sed quae, accusantium et aperiam? Quod itaque exercitationem,
                    at ab sequi qui modi delectus quia corrupti alias distinctio nostrum.
                    Minima ex dolor modi inventore sapiente necessitatibus aliquam fuga et. Sed
                    numquam quibusdam at officia sapiente porro maxime corrupti perspiciatis
                    asperiores, exercitationem eius nostrum consequuntur iure aliquam itaque,
                    assumenda et! Quibusdam temporibus beatae doloremque voluptatum doloribus
                    soluta accusamus porro reprehenderit eos inventore facere, fugit, molestiae
                    ab officiis illo voluptates recusandae. Vel dolor nobis eius, ratione atque
                    soluta, aliquam fugit qui iste architecto perspiciatis. Nobis, voluptatem!
                    Cumque, eligendi unde aliquid minus quis sit debitis obcaecati error,
                    delectus quo eius exercitationem tempore. Delectus sapiente, provident
                    corporis dolorum quibusdam aut beatae repellendus est labore quisquam
                    praesentium repudiandae non vel laboriosam quo ab perferendis velit ipsa
                    deleniti modi! Ipsam, illo quod. Nesciunt commodi nihil corrupti cum non
                    fugiat praesentium doloremque architecto laborum aliquid. Quae, maxime
                    recusandae? Eveniet dolore molestiae dicta blanditiis est expedita eius
                    debitis cupiditate porro sed aspernatur quidem, repellat nihil quasi
                    praesentium quia eos, quibusdam provident. Incidunt tempore vel placeat
                    voluptate iure labore, repellendus beatae quia unde est aliquid dolor
                    molestias libero. Reiciendis similique exercitationem consequatur, nobis
                    placeat illo laudantium! Enim perferendis nulla soluta magni error,
                    provident repellat similique cupiditate ipsam, et tempore cumque quod! Qui,
                    iure suscipit tempora unde rerum autem saepe nisi vel cupiditate iusto.
                    Illum, corrupti? Fugiat quidem accusantium nulla. Aliquid inventore commodi
                    reprehenderit rerum reiciendis! Quidem alias repudiandae eaque eveniet
                    cumque nihil aliquam in expedita, impedit quas ipsum nesciunt ipsa ullam
                    consequuntur dignissimos numquam at nisi porro a, quaerat rem repellendus.
                    Voluptates perspiciatis, in pariatur impedit, nam facilis libero dolorem
                    dolores sunt inventore perferendis, aut sapiente modi nesciunt.`
    },
    {
        id: '1.1',
        title: 'Lección 1',
        subtitle: 'Quiz Tema 1',
        mediaType: 'none',
        src: '',
        quiz: [
            {
                text: "Pregunta 1 del Tema 1",
                options: ["Respuesta 1", "Respuesta 2 (correcta)", "Respuesta 3", "Respuesta 4"],
                correct: 1
            },
            {
                text: "Pregunta 2 del Tema 1",
                options: ["Respuesta 1", "Respuesta 2", "Respuesta 3", "Respuesta 4 (correcta)"],
                correct: 3
            },
            {
                text: "Pregunta 2 del Tema 1",
                options: ["Respuesta 1 (correcta)", "Respuesta 2 ", "Respuesta 3", "Respuesta 4"],
                correct: 0
            }
        ]
    },
    {
        id: 2,
        title: 'Lección 1',
        subtitle: 'Tema 2',
        mediaType: 'image',
        src: imagenPrueba,
        content: `Contenido de la Lección <br/>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde
                    fugit veniam eius, perspiciatis sunt? Corporis qui ducimus quibusdam,
                    aliquam dolore excepturi quae. Distinctio enim at eligendi perferendis in
                    cum quibusdam sed quae, accusantium et aperiam? Quod itaque exercitationem,
                    at ab sequi qui modi delectus quia corrupti alias distinctio nostrum.
                    Minima ex dolor modi inventore sapiente necessitatibus aliquam fuga et. Sed
                    numquam quibusdam at officia sapiente porro maxime corrupti perspiciatis
                    asperiores, exercitationem eius nostrum consequuntur iure aliquam itaque,
                    assumenda et! Quibusdam temporibus beatae doloremque voluptatum doloribus
                    soluta accusamus porro reprehenderit eos inventore facere, fugit, molestiae
                    ab officiis illo voluptates recusandae. Vel dolor nobis eius, ratione atque
                    soluta, aliquam fugit qui iste architecto perspiciatis. Nobis, voluptatem!
                    Cumque, eligendi unde aliquid minus quis sit debitis obcaecati error,
                    delectus quo eius exercitationem tempore. Delectus sapiente, provident
                    corporis dolorum quibusdam aut beatae repellendus est labore quisquam
                    praesentium repudiandae non vel laboriosam quo ab perferendis velit ipsa
                    deleniti modi! Ipsam, illo quod. Nesciunt commodi nihil corrupti cum non
                    fugiat praesentium doloremque architecto laborum aliquid. Quae, maxime
                    recusandae? Eveniet dolore molestiae dicta blanditiis est expedita eius
                    debitis cupiditate porro sed aspernatur quidem, repellat nihil quasi
                    praesentium quia eos, quibusdam provident. Incidunt tempore vel placeat
                    voluptate iure labore, repellendus beatae quia unde est aliquid dolor
                    molestias libero. Reiciendis similique exercitationem consequatur, nobis
                    placeat illo laudantium! Enim perferendis nulla soluta magni error,
                    provident repellat similique cupiditate ipsam, et tempore cumque quod! Qui,
                    iure suscipit tempora unde rerum autem saepe nisi vel cupiditate iusto.
                    Illum, corrupti? Fugiat quidem accusantium nulla. Aliquid inventore commodi
                    reprehenderit rerum reiciendis! Quidem alias repudiandae eaque eveniet
                    cumque nihil aliquam in expedita, impedit quas ipsum nesciunt ipsa ullam
                    consequuntur dignissimos numquam at nisi porro a, quaerat rem repellendus.
                    Voluptates perspiciatis, in pariatur impedit, nam facilis libero dolorem
                    dolores sunt inventore perferendis, aut sapiente modi nesciunt.`
    },
    {
        id: '2.1',
        title: 'Lección 1',
        subtitle: 'Quiz Tema 2',
        mediaType: 'none',
        src: '',
        quiz: [
            {
                text: "Pregunta 1 Tema 2",
                options: ["Respuesta 1", "Respuesta 2 (correcta)", "Respuesta 3", "Respuesta 4"],
                correct: 1
            },
            {
                text: "Pregunta 2 Tema 2",
                options: ["Respuesta 1", "Respuesta 2", "Respuesta 3", "Respuesta 4 (correcta)"],
                correct: 3
            },
            {
                text: "Pregunta 3 Tema 2",
                options: ["Respuesta 1 (correcta)", "Respuesta 2 ", "Respuesta 3", "Respuesta 4"],
                correct: 0
            }
        ]
    },
    {
        id: 3,
        title: 'Lección 1',
        subtitle: 'Tema 3',
        mediaType: 'video',
        src: videoPrueba,
        content: `Contenido de la Lección <br/>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde
                    fugit veniam eius, perspiciatis sunt? Corporis qui ducimus quibusdam,
                    aliquam dolore excepturi quae. Distinctio enim at eligendi perferendis in
                    cum quibusdam sed quae, accusantium et aperiam? Quod itaque exercitationem,
                    at ab sequi qui modi delectus quia corrupti alias distinctio nostrum.
                    Minima ex dolor modi inventore sapiente necessitatibus aliquam fuga et. Sed
                    numquam quibusdam at officia sapiente porro maxime corrupti perspiciatis
                    asperiores, exercitationem eius nostrum consequuntur iure aliquam itaque,
                    assumenda et! Quibusdam temporibus beatae doloremque voluptatum doloribus
                    soluta accusamus porro reprehenderit eos inventore facere, fugit, molestiae
                    ab officiis illo voluptates recusandae. Vel dolor nobis eius, ratione atque
                    soluta, aliquam fugit qui iste architecto perspiciatis. Nobis, voluptatem!
                    Cumque, eligendi unde aliquid minus quis sit debitis obcaecati error,
                    delectus quo eius exercitationem tempore. Delectus sapiente, provident
                    corporis dolorum quibusdam aut beatae repellendus est labore quisquam
                    praesentium repudiandae non vel laboriosam quo ab perferendis velit ipsa
                    deleniti modi! Ipsam, illo quod. Nesciunt commodi nihil corrupti cum non
                    fugiat praesentium doloremque architecto laborum aliquid. Quae, maxime
                    recusandae? Eveniet dolore molestiae dicta blanditiis est expedita eius
                    debitis cupiditate porro sed aspernatur quidem, repellat nihil quasi
                    praesentium quia eos, quibusdam provident. Incidunt tempore vel placeat
                    voluptate iure labore, repellendus beatae quia unde est aliquid dolor
                    molestias libero. Reiciendis similique exercitationem consequatur, nobis
                    placeat illo laudantium! Enim perferendis nulla soluta magni error,
                    provident repellat similique cupiditate ipsam, et tempore cumque quod! Qui,
                    iure suscipit tempora unde rerum autem saepe nisi vel cupiditate iusto.
                    Illum, corrupti? Fugiat quidem accusantium nulla. Aliquid inventore commodi
                    reprehenderit rerum reiciendis! Quidem alias repudiandae eaque eveniet
                    cumque nihil aliquam in expedita, impedit quas ipsum nesciunt ipsa ullam
                    consequuntur dignissimos numquam at nisi porro a, quaerat rem repellendus.
                    Voluptates perspiciatis, in pariatur impedit, nam facilis libero dolorem
                    dolores sunt inventore perferendis, aut sapiente modi nesciunt.`
    },
    {
        id: '3.1',
        title: 'Lección 1',
        subtitle: 'Quiz Tema 3',
        mediaType: 'none',
        src: '',
        quiz: [
            {
                text: "Pregunta 1 Tema 3",
                options: ["Respuesta 1", "Respuesta 2 (correcta)", "Respuesta 3", "Respuesta 4"],
                correct: 1
            },
            {
                text: "Pregunta 1 Tema 3",
                options: ["Respuesta 1", "Respuesta 2", "Respuesta 3", "Respuesta 4 (correcta)"],
                correct: 3
            },
            {
                text: "Pregunta 1 Tema 3",
                options: ["Respuesta 1 (correcta)", "Respuesta 2 ", "Respuesta 3", "Respuesta 4"],
                correct: 0
            }
        ]
    },
    {
        id: 4,
        title: 'Lección 1',
        subtitle: 'Tema 4',
        mediaType: 'none',
        src: '',
        content: `Contenido de la Lección <br/>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde
                    fugit veniam eius, perspiciatis sunt? Corporis qui ducimus quibusdam,
                    aliquam dolore excepturi quae. Distinctio enim at eligendi perferendis in
                    cum quibusdam sed quae, accusantium et aperiam? Quod itaque exercitationem,
                    at ab sequi qui modi delectus quia corrupti alias distinctio nostrum.
                    Minima ex dolor modi inventore sapiente necessitatibus aliquam fuga et. Sed
                    numquam quibusdam at officia sapiente porro maxime corrupti perspiciatis
                    asperiores, exercitationem eius nostrum consequuntur iure aliquam itaque,
                    assumenda et! Quibusdam temporibus beatae doloremque voluptatum doloribus
                    soluta accusamus porro reprehenderit eos inventore facere, fugit, molestiae
                    ab officiis illo voluptates recusandae. Vel dolor nobis eius, ratione atque
                    soluta, aliquam fugit qui iste architecto perspiciatis. Nobis, voluptatem!
                    Cumque, eligendi unde aliquid minus quis sit debitis obcaecati error,
                    delectus quo eius exercitationem tempore. Delectus sapiente, provident
                    corporis dolorum quibusdam aut beatae repellendus est labore quisquam
                    praesentium repudiandae non vel laboriosam quo ab perferendis velit ipsa
                    deleniti modi! Ipsam, illo quod. Nesciunt commodi nihil corrupti cum non
                    fugiat praesentium doloremque architecto laborum aliquid. Quae, maxime
                    recusandae? Eveniet dolore molestiae dicta blanditiis est expedita eius
                    debitis cupiditate porro sed aspernatur quidem, repellat nihil quasi
                    praesentium quia eos, quibusdam provident. Incidunt tempore vel placeat
                    voluptate iure labore, repellendus beatae quia unde est aliquid dolor
                    molestias libero. Reiciendis similique exercitationem consequatur, nobis
                    placeat illo laudantium! Enim perferendis nulla soluta magni error,
                    provident repellat similique cupiditate ipsam, et tempore cumque quod! Qui,
                    iure suscipit tempora unde rerum autem saepe nisi vel cupiditate iusto.
                    Illum, corrupti? Fugiat quidem accusantium nulla. Aliquid inventore commodi
                    reprehenderit rerum reiciendis! Quidem alias repudiandae eaque eveniet
                    cumque nihil aliquam in expedita, impedit quas ipsum nesciunt ipsa ullam
                    consequuntur dignissimos numquam at nisi porro a, quaerat rem repellendus.
                    Voluptates perspiciatis, in pariatur impedit, nam facilis libero dolorem
                    dolores sunt inventore perferendis, aut sapiente modi nesciunt.`
    },
    {
        id: '4.1',
        title: 'Lección 1',
        subtitle: 'Quiz Tema 4',
        mediaType: 'none',
        src: '',
        quiz: [
            {
                text: "Pregunta 1 Tema 4",
                options: ["Respuesta 1", "Respuesta 2 (correcta)", "Respuesta 3", "Respuesta 4"],
                correct: 1
            },
            {
                text: "Pregunta 2 Tema 4",
                options: ["Respuesta 1", "Respuesta 2", "Respuesta 3", "Respuesta 4 (correcta)"],
                correct: 3
            },
            {
                text: "Pregunta 3 Tema 4",
                options: ["Respuesta 1 (correcta)", "Respuesta 2 ", "Respuesta 3", "Respuesta 4"],
                correct: 0
            }
        ]
    },
    {
        id: 5,
        title: 'Lección 1',
        subtitle: 'Tema 5',
        mediaType: 'none',
        src: '',
        content: `Contenido de la Lección <br/>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde
                    fugit veniam eius, perspiciatis sunt? Corporis qui ducimus quibusdam,
                    aliquam dolore excepturi quae. Distinctio enim at eligendi perferendis in
                    cum quibusdam sed quae, accusantium et aperiam? Quod itaque exercitationem,
                    at ab sequi qui modi delectus quia corrupti alias distinctio nostrum.
                    Minima ex dolor modi inventore sapiente necessitatibus aliquam fuga et. Sed
                    numquam quibusdam at officia sapiente porro maxime corrupti perspiciatis
                    asperiores, exercitationem eius nostrum consequuntur iure aliquam itaque,
                    assumenda et! Quibusdam temporibus beatae doloremque voluptatum doloribus
                    soluta accusamus porro reprehenderit eos inventore facere, fugit, molestiae
                    ab officiis illo voluptates recusandae. Vel dolor nobis eius, ratione atque
                    soluta, aliquam fugit qui iste architecto perspiciatis. Nobis, voluptatem!
                    Cumque, eligendi unde aliquid minus quis sit debitis obcaecati error,
                    delectus quo eius exercitationem tempore. Delectus sapiente, provident
                    corporis dolorum quibusdam aut beatae repellendus est labore quisquam
                    praesentium repudiandae non vel laboriosam quo ab perferendis velit ipsa
                    deleniti modi! Ipsam, illo quod. Nesciunt commodi nihil corrupti cum non
                    fugiat praesentium doloremque architecto laborum aliquid. Quae, maxime
                    recusandae? Eveniet dolore molestiae dicta blanditiis est expedita eius
                    debitis cupiditate porro sed aspernatur quidem, repellat nihil quasi
                    praesentium quia eos, quibusdam provident. Incidunt tempore vel placeat
                    voluptate iure labore, repellendus beatae quia unde est aliquid dolor
                    molestias libero. Reiciendis similique exercitationem consequatur, nobis
                    placeat illo laudantium! Enim perferendis nulla soluta magni error,
                    provident repellat similique cupiditate ipsam, et tempore cumque quod! Qui,
                    iure suscipit tempora unde rerum autem saepe nisi vel cupiditate iusto.
                    Illum, corrupti? Fugiat quidem accusantium nulla. Aliquid inventore commodi
                    reprehenderit rerum reiciendis! Quidem alias repudiandae eaque eveniet
                    cumque nihil aliquam in expedita, impedit quas ipsum nesciunt ipsa ullam
                    consequuntur dignissimos numquam at nisi porro a, quaerat rem repellendus.
                    Voluptates perspiciatis, in pariatur impedit, nam facilis libero dolorem
                    dolores sunt inventore perferendis, aut sapiente modi nesciunt.`
    },
    {
        id: '5.1',
        title: 'Lección 1',
        subtitle: 'Quiz Tema 5',
        mediaType: 'none',
        src: '',
        quiz: [
            {
                text: "Pregunta 1 Tema 5",
                options: ["Respuesta 1", "Respuesta 2 (correcta)", "Respuesta 3", "Respuesta 4"],
                correct: 1
            },
            {
                text: "Pregunta 1 Tema 5",
                options: ["Respuesta 1", "Respuesta 2", "Respuesta 3", "Respuesta 4 (correcta)"],
                correct: 3
            },
            {
                text: "Pregunta 1 Tema 5",
                options: ["Respuesta 1 (correcta)", "Respuesta 2 ", "Respuesta 3", "Respuesta 4"],
                correct: 0
            }
        ]
    }
]

export const course_data = [
    {
        id: 1,
        title: 'Curso 1',
        category: 'Mecánica',
        progress: 10
    },
    {
        id: '1.1',
        title: 'Curso 1 - Quiz',
        category: 'Mecánica',
        progress: 0
    },
    {
        id: 2,
        title: 'Curso 2',
        category: 'Seguridad',
        progress: 20
    },
    {
        id: '2.1',
        title: 'Curso 2 - Quiz',
        category: 'Seguridad',
        progress: 0
    },
    {
        id: 3,
        title: 'Curso 3',
        category: 'Electrónica',
        progress: 30
    },
    {
        id: '3.1',
        title: 'Curso 3 - Quiz',
        category: 'Electrónica',
        progress: 0
    },
    {
        id: 4,
        title: 'Curso 4',
        category: 'Atención al Cliente',
        progress: 40
    },
    {
        id: '4.1',
        title: 'Curso 4 - Quiz',
        category: 'Atención al Cliente',
        progress: 0
    },
    {
        id: 5,
        title: 'Curso 5',
        category: 'Mecánica',
        progress: 100
    },
    {
        id: '5.1',
        title: 'Curso 5 - Quiz',
        category: 'Mecánica',
        progress: 0
    },
    {
        id: 6,
        title: 'Curso 6',
        category: 'Seguridad',
        progress: 100
    },
    {
        id: '6.1',
        title: 'Curso 6 - Quiz',
        category: 'Seguridad',
        progress: 0
    }
];
