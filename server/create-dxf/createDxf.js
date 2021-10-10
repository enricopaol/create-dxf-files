import DXFWriter from "@tarikjabiri/dxf";

const makeBancali = (data) => {    

    const dxf = new DXFWriter();

    dxf.addLayer('Davanzale', DXFWriter.colors.Magenta, 'CONTINUOUS');
    dxf.addLayer('Kerdi_Board', DXFWriter.colors.Yellow, 'CONTINUOUS');
    dxf.addLayer('Quote', DXFWriter.colors.Green, 'CONTINUOUS');

    data.forEach((bancale, index) => {

        const spaziatura = -2000 * index;
        const dimensioni = bancale.dimensioniBancale;
        const spessoreLastra = bancale.spessoreLastra;
        const testoPezzi = bancale.testoPezzi;
        const spaziaturaSezione = 600;

        let points = [
            [0, spaziatura],
            [0, dimensioni.b + spaziatura],
            [-(dimensioni.f), dimensioni.b + spaziatura],
            [-(dimensioni.f), (dimensioni.b + dimensioni.d + spaziatura)],
            [(-(dimensioni.f) + dimensioni.a), (dimensioni.b + dimensioni.d + spaziatura)],
            [(-(dimensioni.f) + dimensioni.a), dimensioni.b + spaziatura],
            [(-(dimensioni.f) + dimensioni.a - dimensioni.e), dimensioni.b + spaziatura],
            [(-(dimensioni.f) + dimensioni.a - dimensioni.e), spaziatura]
        ];

        let pointsFrontalino = [
            (-dimensioni.f),
            ((dimensioni.b + dimensioni.d) + 20 + spaziatura),
            (-(dimensioni.f) + dimensioni.a),
            (dimensioni.b + dimensioni.d + dimensioni.c + 20 + spaziatura)
        ];

        let pointsVistaLateraleUno = [
            ((-(dimensioni.f) + dimensioni.a) + 20),
            (dimensioni.b + spaziatura),
            (-(dimensioni.f) + dimensioni.a + dimensioni.c + 20),
            ((dimensioni.b + dimensioni.d + spaziatura))
        ];

        let pointsVistaLateraleDue = [
            ((-(dimensioni.f) + dimensioni.a) + 20),
            spaziatura,
            ((-(dimensioni.f) + dimensioni.a) + 20 + spessoreLastra),
            (dimensioni.b + spaziatura)
        ];

        let pointsVistaLateraleUnoLeft = [
            ((-(dimensioni.f)) - 20),
            (dimensioni.b + spaziatura),
            ((-(dimensioni.f)) - dimensioni.c - 20),
            ((dimensioni.b + dimensioni.d + spaziatura))
        ];

        let pointsVistaLateraleDueLeft = [
            ((-(dimensioni.f)) - 20),
            spaziatura,
            ((-(dimensioni.f)) - 20 - spessoreLastra),
            (dimensioni.b + spaziatura)
        ];

        let pointsKerdiBoard = [
            0,
            (dimensioni.b + dimensioni.d + dimensioni.c + 60 + spaziatura),
            (dimensioni.a - dimensioni.e - dimensioni.f),
            (dimensioni.b + dimensioni.d + dimensioni.c + dimensioni.b + 60 + spaziatura)
        ];

        let sezioneLastraSuperiore = [
            [((-(dimensioni.f) + dimensioni.a) + 20 + spaziaturaSezione + spessoreLastra), spaziatura],
            [((-(dimensioni.f) + dimensioni.a) + 20 + spaziaturaSezione + spessoreLastra + dimensioni.b + dimensioni.d), spaziatura],
            [((-(dimensioni.f) + dimensioni.a) + 20 + spaziaturaSezione + dimensioni.b + dimensioni.d), spaziatura - spessoreLastra],
            [((-(dimensioni.f) + dimensioni.a) + 20 + spaziaturaSezione + spessoreLastra), spaziatura - spessoreLastra]            
        ];

        let sezioneLastraLaterale = [
            [((-(dimensioni.f) + dimensioni.a) + 20 + spaziaturaSezione + spessoreLastra + dimensioni.b + dimensioni.d), spaziatura],
            [((-(dimensioni.f) + dimensioni.a) + 20 + spaziaturaSezione + spessoreLastra + dimensioni.b + dimensioni.d), spaziatura - dimensioni.c],
            [((-(dimensioni.f) + dimensioni.a) + 20 + spaziaturaSezione + dimensioni.b + dimensioni.d), spaziatura - dimensioni.c],
            [((-(dimensioni.f) + dimensioni.a) + 20 + spaziaturaSezione + dimensioni.b + dimensioni.d), spaziatura - spessoreLastra]
        ];

        let sezioneGocciolatoio = [
            [((-(dimensioni.f) + dimensioni.a) + 20 + spaziaturaSezione + dimensioni.b + dimensioni.d), spaziatura - dimensioni.c],
            [((-(dimensioni.f) + dimensioni.a) + 20 + spaziaturaSezione + dimensioni.b + dimensioni.d - 0.75), spaziatura - dimensioni.c],
            [((-(dimensioni.f) + dimensioni.a) + 20 + spaziaturaSezione + dimensioni.b + dimensioni.d - 0.75), spaziatura - dimensioni.c + 0.5],
            [((-(dimensioni.f) + dimensioni.a) + 20 + spaziaturaSezione + dimensioni.b + dimensioni.d - 1.75), spaziatura - dimensioni.c + 0.5],
            [((-(dimensioni.f) + dimensioni.a) + 20 + spaziaturaSezione + dimensioni.b + dimensioni.d - 1.75), spaziatura - dimensioni.c],
            [((-(dimensioni.f) + dimensioni.a) + 20 + spaziaturaSezione + spessoreLastra + dimensioni.b), spaziatura - dimensioni.c],
            [((-(dimensioni.f) + dimensioni.a) + 20 + spaziaturaSezione + spessoreLastra + dimensioni.b), spaziatura - spessoreLastra],
            [((-(dimensioni.f) + dimensioni.a) + 20 + spaziaturaSezione + dimensioni.b + dimensioni.d), spaziatura - spessoreLastra]
        ]

        // Davanzale
        dxf.setCurrentLayer('Davanzale')
            // Davanzale
            .addPolyline(points, 1)
            // Frontalino
            .addRectangle(pointsFrontalino[0], pointsFrontalino[1], pointsFrontalino[2], pointsFrontalino[3])
            // Vista laterale Destra
            .addRectangle(pointsVistaLateraleUno[0], pointsVistaLateraleUno[1], pointsVistaLateraleUno[2], pointsVistaLateraleUno[3])
            .addRectangle(pointsVistaLateraleDue[0], pointsVistaLateraleDue[1], pointsVistaLateraleDue[2], pointsVistaLateraleDue[3])
            // Vista laterale Sinistra
            .addRectangle(pointsVistaLateraleUnoLeft[0], pointsVistaLateraleUnoLeft[1], pointsVistaLateraleUnoLeft[2], pointsVistaLateraleUnoLeft[3])
            .addRectangle(pointsVistaLateraleDueLeft[0], pointsVistaLateraleDueLeft[1], pointsVistaLateraleDueLeft[2], pointsVistaLateraleDueLeft[3])
            // Sezione
            .addPolyline(sezioneLastraSuperiore, 1)
            .addPolyline(sezioneLastraLaterale, 1)
            .addPolyline(sezioneGocciolatoio, 1);

        // Kerdi Board
        dxf.setCurrentLayer('Kerdi_Board')
            .addRectangle(pointsKerdiBoard[0], pointsKerdiBoard[1], pointsKerdiBoard[2], pointsKerdiBoard[3]);


        // Testo quote 
        dxf.setCurrentLayer('Quote')
            .addText(-1000, 40 + spaziatura, 80, testoPezzi);
    })


    // ✔️ To get the dxf string just call the stringify() method
    return dxf.stringify();
}

export default makeBancali;












