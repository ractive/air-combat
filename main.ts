const hardcore: boolean = game.ask("Hardcore mode?");

const MULTIPLAYER_ENABLED = control.ramSize() > 1024 * 400;
const twoPlayerMode: boolean = MULTIPLAYER_ENABLED && game.ask("Two player mode?");

light.setBrightness(7);
light.setLength(5);
scene.setBackgroundColor(9);

Players.addPlayerOne();
if (twoPlayerMode) {
    Players.addPlayerTwo();
}
if (game.ask("Do you want Music?", "May Increase Lag")) {
    let stop_music: boolean = false
//* Probably the best is to minimize the forever function below
forever(function() {
    
    timer.background(function() {
        function play_song() {
    stop_music = false
    // ['C2']
    if (!stop_music) {
        music.setVolume(80)
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C3', 'G3', 'C2']
    if (!stop_music) {
        // C3
        timer.background(function() {
            play_note(130, 496.0, 27, 1, 9)
        })
        // G3
        timer.background(function() {
            play_note(195, 496.0, 34, 1, 9)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C3', 'G3', 'C2']
    if (!stop_music) {
        // C3
        timer.background(function() {
            play_note(130, 164.0, 27, 1, 9)
        })
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 164.0, 41, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G#3', 'D#4', 'C2']
    if (!stop_music) {
        // G#3
        timer.background(function() {
            play_note(207, 164.0, 35, 15, 8)
        })
        // D#4
        timer.background(function() {
            play_note(311, 164.0, 42, 15, 8)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C4', 'G4', 'C2']
    if (!stop_music) {
        // C4
        timer.background(function() {
            play_note(261, 496.0, 39, 1, 9)
        })
        // G4
        timer.background(function() {
            play_note(391, 496.0, 46, 1, 9)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C3', 'G3', 'C2']
    if (!stop_music) {
        // C3
        timer.background(function() {
            play_note(130, 164.0, 27, 1, 9)
        })
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 164.0, 41, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G#3', 'D#4', 'C2']
    if (!stop_music) {
        // G#3
        timer.background(function() {
            play_note(207, 164.0, 35, 15, 8)
        })
        // D#4
        timer.background(function() {
            play_note(311, 164.0, 42, 15, 8)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['D#4', 'G#4', 'C2']
    if (!stop_music) {
        // D#4
        timer.background(function() {
            play_note(311, 496.0, 42, 15, 8)
        })
        // G#4
        timer.background(function() {
            play_note(415, 496.0, 47, 15, 8)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C3', 'G3', 'C2']
    if (!stop_music) {
        // C3
        timer.background(function() {
            play_note(130, 164.0, 27, 1, 9)
        })
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 164.0, 41, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G#3', 'D#4', 'C2']
    if (!stop_music) {
        // G#3
        timer.background(function() {
            play_note(207, 164.0, 35, 15, 8)
        })
        // D#4
        timer.background(function() {
            play_note(311, 164.0, 42, 15, 8)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['F4', 'A#4', 'C2']
    if (!stop_music) {
        // F4
        timer.background(function() {
            play_note(349, 246.0, 44, 1, 9)
        })
        // A#4
        timer.background(function() {
            play_note(466, 246.0, 49, 15, 8)
        })
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['D#4', 'G#4', 'C2']
    if (!stop_music) {
        // D#4
        timer.background(function() {
            play_note(311, 246.0, 42, 15, 8)
        })
        // G#4
        timer.background(function() {
            play_note(415, 246.0, 47, 15, 8)
        })
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 496.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 496.0, 41, 1, 9)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C3', 'G3', 'C2']
    if (!stop_music) {
        // C3
        timer.background(function() {
            play_note(130, 164.0, 27, 1, 9)
        })
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 164.0, 41, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G#3', 'D#4', 'C2']
    if (!stop_music) {
        // G#3
        timer.background(function() {
            play_note(207, 164.0, 35, 15, 8)
        })
        // D#4
        timer.background(function() {
            play_note(311, 164.0, 42, 15, 8)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C4', 'G4', 'C2']
    if (!stop_music) {
        // C4
        timer.background(function() {
            play_note(261, 496.0, 39, 1, 9)
        })
        // G4
        timer.background(function() {
            play_note(391, 496.0, 46, 1, 9)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C3', 'G3', 'C2']
    if (!stop_music) {
        // C3
        timer.background(function() {
            play_note(130, 164.0, 27, 1, 9)
        })
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 164.0, 41, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G#3', 'D#4', 'C2']
    if (!stop_music) {
        // G#3
        timer.background(function() {
            play_note(207, 164.0, 35, 15, 8)
        })
        // D#4
        timer.background(function() {
            play_note(311, 164.0, 42, 15, 8)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['D#4', 'G#4', 'C2']
    if (!stop_music) {
        // D#4
        timer.background(function() {
            play_note(311, 496.0, 42, 15, 8)
        })
        // G#4
        timer.background(function() {
            play_note(415, 496.0, 47, 15, 8)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C3', 'G3', 'C2']
    if (!stop_music) {
        // C3
        timer.background(function() {
            play_note(130, 164.0, 27, 1, 9)
        })
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 164.0, 41, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G#3', 'D#4', 'C2']
    if (!stop_music) {
        // G#3
        timer.background(function() {
            play_note(207, 164.0, 35, 15, 8)
        })
        // D#4
        timer.background(function() {
            play_note(311, 164.0, 42, 15, 8)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['F4', 'A#4', 'C2']
    if (!stop_music) {
        // F4
        timer.background(function() {
            play_note(349, 246.0, 44, 1, 9)
        })
        // A#4
        timer.background(function() {
            play_note(466, 246.0, 49, 15, 8)
        })
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['D#4', 'G#4', 'C2']
    if (!stop_music) {
        // D#4
        timer.background(function() {
            play_note(311, 246.0, 42, 15, 8)
        })
        // G#4
        timer.background(function() {
            play_note(415, 246.0, 47, 15, 8)
        })
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C4', 'G4', 'C2']
    if (!stop_music) {
        // C4
        timer.background(function() {
            play_note(261, 496.0, 39, 1, 9)
        })
        // G4
        timer.background(function() {
            play_note(391, 496.0, 46, 1, 9)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 131, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 496.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 496.0, 41, 1, 9)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C3', 'G3', 'C2']
    if (!stop_music) {
        // C3
        timer.background(function() {
            play_note(130, 496.0, 27, 1, 9)
        })
        // G3
        timer.background(function() {
            play_note(195, 496.0, 34, 1, 9)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C3', 'G3', 'C2']
    if (!stop_music) {
        // C3
        timer.background(function() {
            play_note(130, 164.0, 27, 1, 9)
        })
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 164.0, 41, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G#3', 'D#4', 'C2']
    if (!stop_music) {
        // G#3
        timer.background(function() {
            play_note(207, 164.0, 35, 15, 8)
        })
        // D#4
        timer.background(function() {
            play_note(311, 164.0, 42, 15, 8)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C4', 'G4', 'C2']
    if (!stop_music) {
        // C4
        timer.background(function() {
            play_note(261, 496.0, 39, 1, 9)
        })
        // G4
        timer.background(function() {
            play_note(391, 496.0, 46, 1, 9)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C3', 'G3', 'C2']
    if (!stop_music) {
        // C3
        timer.background(function() {
            play_note(130, 164.0, 27, 1, 9)
        })
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 164.0, 41, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G#3', 'D#4', 'C2']
    if (!stop_music) {
        // G#3
        timer.background(function() {
            play_note(207, 164.0, 35, 15, 8)
        })
        // D#4
        timer.background(function() {
            play_note(311, 164.0, 42, 15, 8)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['D#4', 'G#4', 'C2']
    if (!stop_music) {
        // D#4
        timer.background(function() {
            play_note(311, 496.0, 42, 15, 8)
        })
        // G#4
        timer.background(function() {
            play_note(415, 496.0, 47, 15, 8)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C3', 'G3', 'C2']
    if (!stop_music) {
        // C3
        timer.background(function() {
            play_note(130, 164.0, 27, 1, 9)
        })
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 164.0, 41, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G#3', 'D#4', 'C2']
    if (!stop_music) {
        // G#3
        timer.background(function() {
            play_note(207, 164.0, 35, 15, 8)
        })
        // D#4
        timer.background(function() {
            play_note(311, 164.0, 42, 15, 8)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['F4', 'A#4', 'C2']
    if (!stop_music) {
        // F4
        timer.background(function() {
            play_note(349, 246.0, 44, 1, 9)
        })
        // A#4
        timer.background(function() {
            play_note(466, 246.0, 49, 15, 8)
        })
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['D#4', 'G#4', 'C2']
    if (!stop_music) {
        // D#4
        timer.background(function() {
            play_note(311, 246.0, 42, 15, 8)
        })
        // G#4
        timer.background(function() {
            play_note(415, 246.0, 47, 15, 8)
        })
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 496.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 496.0, 41, 1, 9)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C3', 'G3', 'C2']
    if (!stop_music) {
        // C3
        timer.background(function() {
            play_note(130, 164.0, 27, 1, 9)
        })
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 164.0, 41, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G#3', 'D#4', 'C2']
    if (!stop_music) {
        // G#3
        timer.background(function() {
            play_note(207, 164.0, 35, 15, 8)
        })
        // D#4
        timer.background(function() {
            play_note(311, 164.0, 42, 15, 8)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C4', 'G4', 'C2']
    if (!stop_music) {
        // C4
        timer.background(function() {
            play_note(261, 496.0, 39, 1, 9)
        })
        // G4
        timer.background(function() {
            play_note(391, 496.0, 46, 1, 9)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C3', 'G3', 'C2']
    if (!stop_music) {
        // C3
        timer.background(function() {
            play_note(130, 164.0, 27, 1, 9)
        })
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 164.0, 41, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G#3', 'D#4', 'C2']
    if (!stop_music) {
        // G#3
        timer.background(function() {
            play_note(207, 164.0, 35, 15, 8)
        })
        // D#4
        timer.background(function() {
            play_note(311, 164.0, 42, 15, 8)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['D#4', 'G#4', 'C2']
    if (!stop_music) {
        // D#4
        timer.background(function() {
            play_note(311, 496.0, 42, 15, 8)
        })
        // G#4
        timer.background(function() {
            play_note(415, 496.0, 47, 15, 8)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C3', 'G3', 'C2']
    if (!stop_music) {
        // C3
        timer.background(function() {
            play_note(130, 164.0, 27, 1, 9)
        })
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 164.0, 41, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G#3', 'D#4', 'C2']
    if (!stop_music) {
        // G#3
        timer.background(function() {
            play_note(207, 164.0, 35, 15, 8)
        })
        // D#4
        timer.background(function() {
            play_note(311, 164.0, 42, 15, 8)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['F4', 'A#4', 'C2']
    if (!stop_music) {
        // F4
        timer.background(function() {
            play_note(349, 246.0, 44, 1, 9)
        })
        // A#4
        timer.background(function() {
            play_note(466, 246.0, 49, 15, 8)
        })
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['A#3', 'D#4', 'C2']
    if (!stop_music) {
        // A#3
        timer.background(function() {
            play_note(233, 246.0, 37, 15, 8)
        })
        // D#4
        timer.background(function() {
            play_note(311, 246.0, 42, 15, 8)
        })
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C4', 'G4', 'C2']
    if (!stop_music) {
        // C4
        timer.background(function() {
            play_note(261, 496.0, 39, 1, 9)
        })
        // G4
        timer.background(function() {
            play_note(391, 496.0, 46, 1, 9)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 131, 15, 1, 9)
    } else { return }
    // ['D#4', 'G#4', 'C2']
    if (!stop_music) {
        // D#4
        timer.background(function() {
            play_note(311, 496.0, 42, 15, 8)
        })
        // G#4
        timer.background(function() {
            play_note(415, 496.0, 47, 15, 8)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['G4', 'C5', 'C#2']
    if (!stop_music) {
        // G4
        timer.background(function() {
            play_note(391, 496.0, 46, 1, 9)
        })
        // C5
        timer.background(function() {
            play_note(523, 496.0, 51, 1, 9)
        })
        // C#2
        play_note(69, 497, 16, 15, 8)
    } else { return }
    // ['C#2']
    if (!stop_music) {
        // C#2
        play_note(69, 164, 16, 15, 8)
    } else { return }
    // ['C#2']
    if (!stop_music) {
        // C#2
        play_note(69, 164, 16, 15, 8)
    } else { return }
    // ['C#2']
    if (!stop_music) {
        // C#2
        play_note(69, 164, 16, 15, 8)
    } else { return }
    // ['F4', 'A#4', 'C#2']
    if (!stop_music) {
        // F4
        timer.background(function() {
            play_note(349, 496.0, 44, 1, 9)
        })
        // A#4
        timer.background(function() {
            play_note(466, 496.0, 49, 15, 8)
        })
        // C#2
        play_note(69, 497, 16, 15, 8)
    } else { return }
    // ['C#2']
    if (!stop_music) {
        // C#2
        play_note(69, 164, 16, 15, 8)
    } else { return }
    // ['C#2']
    if (!stop_music) {
        // C#2
        play_note(69, 164, 16, 15, 8)
    } else { return }
    // ['C#2']
    if (!stop_music) {
        // C#2
        play_note(69, 164, 16, 15, 8)
    } else { return }
    // ['D4', 'G4', 'C#2']
    if (!stop_music) {
        // D4
        timer.background(function() {
            play_note(293, 496.0, 41, 1, 9)
        })
        // G4
        timer.background(function() {
            play_note(391, 496.0, 46, 1, 9)
        })
        // C#2
        play_note(69, 497, 16, 15, 8)
    } else { return }
    // ['C#2']
    if (!stop_music) {
        // C#2
        play_note(69, 164, 16, 15, 8)
    } else { return }
    // ['C#2']
    if (!stop_music) {
        // C#2
        play_note(69, 164, 16, 15, 8)
    } else { return }
    // ['C#2']
    if (!stop_music) {
        // C#2
        play_note(69, 164, 16, 15, 8)
    } else { return }
    // ['C4', 'F4', 'C#2']
    if (!stop_music) {
        // C4
        timer.background(function() {
            play_note(261, 246.0, 39, 1, 9)
        })
        // F4
        timer.background(function() {
            play_note(349, 246.0, 44, 1, 9)
        })
        // C#2
        play_note(69, 247, 16, 15, 8)
    } else { return }
    // ['C#2']
    if (!stop_music) {
        // C#2
        play_note(69, 247, 16, 15, 8)
    } else { return }
    // ['C#2']
    if (!stop_music) {
        // C#2
        play_note(69, 247, 16, 15, 8)
    } else { return }
    // ['C#2']
    if (!stop_music) {
        // C#2
        play_note(69, 247, 16, 15, 8)
    } else { return }
    // ['A3', 'D4', 'D2']
    if (!stop_music) {
        // A3
        timer.background(function() {
            play_note(220, 496.0, 36, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 496.0, 41, 1, 9)
        })
        // D2
        play_note(73, 497, 17, 1, 9)
    } else { return }
    // ['D2']
    if (!stop_music) {
        // D2
        play_note(73, 164, 17, 1, 9)
    } else { return }
    // ['D2']
    if (!stop_music) {
        // D2
        play_note(73, 164, 17, 1, 9)
    } else { return }
    // ['D2']
    if (!stop_music) {
        // D2
        play_note(73, 164, 17, 1, 9)
    } else { return }
    // ['D2']
    if (!stop_music) {
        // D2
        play_note(73, 497, 17, 1, 9)
    } else { return }
    // ['D2']
    if (!stop_music) {
        // D2
        play_note(73, 164, 17, 1, 9)
    } else { return }
    // ['D2']
    if (!stop_music) {
        // D2
        play_note(73, 164, 17, 1, 9)
    } else { return }
    // ['D2']
    if (!stop_music) {
        // D2
        play_note(73, 164, 17, 1, 9)
    } else { return }
    // ['A#3', 'D#4', 'D2']
    if (!stop_music) {
        // A#3
        timer.background(function() {
            play_note(233, 496.0, 37, 15, 8)
        })
        // D#4
        timer.background(function() {
            play_note(311, 496.0, 42, 15, 8)
        })
        // D2
        play_note(73, 497, 17, 1, 9)
    } else { return }
    // ['D2']
    if (!stop_music) {
        // D2
        play_note(73, 164, 17, 1, 9)
    } else { return }
    // ['D2']
    if (!stop_music) {
        // D2
        play_note(73, 164, 17, 1, 9)
    } else { return }
    // ['D2']
    if (!stop_music) {
        // D2
        play_note(73, 164, 17, 1, 9)
    } else { return }
    // []
    if (!stop_music) {
    } else { return }
    // ['D4', 'D2']
    if (!stop_music) {
        // D4
        timer.background(function() {
            play_note(293, 246.0, 41, 1, 9)
        })
        // D2
        play_note(73, 247, 17, 1, 9)
    } else { return }
    // ['D2']
    if (!stop_music) {
        // D2
        play_note(73, 247, 17, 1, 9)
    } else { return }
    // ['D2']
    if (!stop_music) {
        // D2
        play_note(73, 247, 17, 1, 9)
    } else { return }
    // ['D2']
    if (!stop_music) {
        // D2
        play_note(73, 247, 17, 1, 9)
    } else { return }
    // ['C3', 'G3', 'C2']
    if (!stop_music) {
        // C3
        timer.background(function() {
            play_note(130, 496.0, 27, 1, 9)
        })
        // G3
        timer.background(function() {
            play_note(195, 496.0, 34, 1, 9)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C3', 'G3', 'C2']
    if (!stop_music) {
        // C3
        timer.background(function() {
            play_note(130, 164.0, 27, 1, 9)
        })
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 164.0, 41, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G#3', 'D#4', 'C2']
    if (!stop_music) {
        // G#3
        timer.background(function() {
            play_note(207, 164.0, 35, 15, 8)
        })
        // D#4
        timer.background(function() {
            play_note(311, 164.0, 42, 15, 8)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C4', 'G4', 'C2']
    if (!stop_music) {
        // C4
        timer.background(function() {
            play_note(261, 496.0, 39, 1, 9)
        })
        // G4
        timer.background(function() {
            play_note(391, 496.0, 46, 1, 9)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C3', 'G3', 'C2']
    if (!stop_music) {
        // C3
        timer.background(function() {
            play_note(130, 164.0, 27, 1, 9)
        })
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 164.0, 41, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G#3', 'D#4', 'C2']
    if (!stop_music) {
        // G#3
        timer.background(function() {
            play_note(207, 164.0, 35, 15, 8)
        })
        // D#4
        timer.background(function() {
            play_note(311, 164.0, 42, 15, 8)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['D#4', 'G#4', 'C2']
    if (!stop_music) {
        // D#4
        timer.background(function() {
            play_note(311, 496.0, 42, 15, 8)
        })
        // G#4
        timer.background(function() {
            play_note(415, 496.0, 47, 15, 8)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C3', 'G3', 'C2']
    if (!stop_music) {
        // C3
        timer.background(function() {
            play_note(130, 164.0, 27, 1, 9)
        })
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 164.0, 41, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G#3', 'D#4', 'C2']
    if (!stop_music) {
        // G#3
        timer.background(function() {
            play_note(207, 164.0, 35, 15, 8)
        })
        // D#4
        timer.background(function() {
            play_note(311, 164.0, 42, 15, 8)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['F4', 'A#4', 'C2']
    if (!stop_music) {
        // F4
        timer.background(function() {
            play_note(349, 246.0, 44, 1, 9)
        })
        // A#4
        timer.background(function() {
            play_note(466, 246.0, 49, 15, 8)
        })
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['D#4', 'G#4', 'C2']
    if (!stop_music) {
        // D#4
        timer.background(function() {
            play_note(311, 246.0, 42, 15, 8)
        })
        // G#4
        timer.background(function() {
            play_note(415, 246.0, 47, 15, 8)
        })
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 496.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 496.0, 41, 1, 9)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C3', 'G3', 'C2']
    if (!stop_music) {
        // C3
        timer.background(function() {
            play_note(130, 164.0, 27, 1, 9)
        })
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 164.0, 41, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G#3', 'D#4', 'C2']
    if (!stop_music) {
        // G#3
        timer.background(function() {
            play_note(207, 164.0, 35, 15, 8)
        })
        // D#4
        timer.background(function() {
            play_note(311, 164.0, 42, 15, 8)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C4', 'G4', 'C2']
    if (!stop_music) {
        // C4
        timer.background(function() {
            play_note(261, 496.0, 39, 1, 9)
        })
        // G4
        timer.background(function() {
            play_note(391, 496.0, 46, 1, 9)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C3', 'G3', 'C2']
    if (!stop_music) {
        // C3
        timer.background(function() {
            play_note(130, 164.0, 27, 1, 9)
        })
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 164.0, 41, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G#3', 'D#4', 'C2']
    if (!stop_music) {
        // G#3
        timer.background(function() {
            play_note(207, 164.0, 35, 15, 8)
        })
        // D#4
        timer.background(function() {
            play_note(311, 164.0, 42, 15, 8)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['D#4', 'G#4', 'C2']
    if (!stop_music) {
        // D#4
        timer.background(function() {
            play_note(311, 496.0, 42, 15, 8)
        })
        // G#4
        timer.background(function() {
            play_note(415, 496.0, 47, 15, 8)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C3', 'G3', 'C2']
    if (!stop_music) {
        // C3
        timer.background(function() {
            play_note(130, 164.0, 27, 1, 9)
        })
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 164.0, 41, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G#3', 'D#4', 'C2']
    if (!stop_music) {
        // G#3
        timer.background(function() {
            play_note(207, 164.0, 35, 15, 8)
        })
        // D#4
        timer.background(function() {
            play_note(311, 164.0, 42, 15, 8)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['F4', 'A#4', 'C2']
    if (!stop_music) {
        // F4
        timer.background(function() {
            play_note(349, 246.0, 44, 1, 9)
        })
        // A#4
        timer.background(function() {
            play_note(466, 246.0, 49, 15, 8)
        })
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['D#4', 'G#4', 'C2']
    if (!stop_music) {
        // D#4
        timer.background(function() {
            play_note(311, 246.0, 42, 15, 8)
        })
        // G#4
        timer.background(function() {
            play_note(415, 246.0, 47, 15, 8)
        })
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C4', 'G4', 'C2']
    if (!stop_music) {
        // C4
        timer.background(function() {
            play_note(261, 496.0, 39, 1, 9)
        })
        // G4
        timer.background(function() {
            play_note(391, 496.0, 46, 1, 9)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 131, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 496.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 496.0, 41, 1, 9)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C3', 'G3', 'C2']
    if (!stop_music) {
        // C3
        timer.background(function() {
            play_note(130, 496.0, 27, 1, 9)
        })
        // G3
        timer.background(function() {
            play_note(195, 496.0, 34, 1, 9)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C3', 'G3', 'C2']
    if (!stop_music) {
        // C3
        timer.background(function() {
            play_note(130, 164.0, 27, 1, 9)
        })
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 164.0, 41, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G#3', 'D#4', 'C2']
    if (!stop_music) {
        // G#3
        timer.background(function() {
            play_note(207, 164.0, 35, 15, 8)
        })
        // D#4
        timer.background(function() {
            play_note(311, 164.0, 42, 15, 8)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C4', 'G4', 'C2']
    if (!stop_music) {
        // C4
        timer.background(function() {
            play_note(261, 496.0, 39, 1, 9)
        })
        // G4
        timer.background(function() {
            play_note(391, 496.0, 46, 1, 9)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C3', 'G3', 'C2']
    if (!stop_music) {
        // C3
        timer.background(function() {
            play_note(130, 164.0, 27, 1, 9)
        })
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 164.0, 41, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G#3', 'D#4', 'C2']
    if (!stop_music) {
        // G#3
        timer.background(function() {
            play_note(207, 164.0, 35, 15, 8)
        })
        // D#4
        timer.background(function() {
            play_note(311, 164.0, 42, 15, 8)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['D#4', 'G#4', 'C2']
    if (!stop_music) {
        // D#4
        timer.background(function() {
            play_note(311, 496.0, 42, 15, 8)
        })
        // G#4
        timer.background(function() {
            play_note(415, 496.0, 47, 15, 8)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C3', 'G3', 'C2']
    if (!stop_music) {
        // C3
        timer.background(function() {
            play_note(130, 164.0, 27, 1, 9)
        })
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 164.0, 41, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G#3', 'D#4', 'C2']
    if (!stop_music) {
        // G#3
        timer.background(function() {
            play_note(207, 164.0, 35, 15, 8)
        })
        // D#4
        timer.background(function() {
            play_note(311, 164.0, 42, 15, 8)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['F4', 'A#4', 'C2']
    if (!stop_music) {
        // F4
        timer.background(function() {
            play_note(349, 246.0, 44, 1, 9)
        })
        // A#4
        timer.background(function() {
            play_note(466, 246.0, 49, 15, 8)
        })
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['D#4', 'G#4', 'C2']
    if (!stop_music) {
        // D#4
        timer.background(function() {
            play_note(311, 246.0, 42, 15, 8)
        })
        // G#4
        timer.background(function() {
            play_note(415, 246.0, 47, 15, 8)
        })
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 496.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 496.0, 41, 1, 9)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C3', 'G3', 'C2']
    if (!stop_music) {
        // C3
        timer.background(function() {
            play_note(130, 164.0, 27, 1, 9)
        })
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 164.0, 41, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G#3', 'D#4', 'C2']
    if (!stop_music) {
        // G#3
        timer.background(function() {
            play_note(207, 164.0, 35, 15, 8)
        })
        // D#4
        timer.background(function() {
            play_note(311, 164.0, 42, 15, 8)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C4', 'G4', 'C2']
    if (!stop_music) {
        // C4
        timer.background(function() {
            play_note(261, 496.0, 39, 1, 9)
        })
        // G4
        timer.background(function() {
            play_note(391, 496.0, 46, 1, 9)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C3', 'G3', 'C2']
    if (!stop_music) {
        // C3
        timer.background(function() {
            play_note(130, 164.0, 27, 1, 9)
        })
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 164.0, 41, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G#3', 'D#4', 'C2']
    if (!stop_music) {
        // G#3
        timer.background(function() {
            play_note(207, 164.0, 35, 15, 8)
        })
        // D#4
        timer.background(function() {
            play_note(311, 164.0, 42, 15, 8)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['D#4', 'G#4', 'C2']
    if (!stop_music) {
        // D#4
        timer.background(function() {
            play_note(311, 496.0, 42, 15, 8)
        })
        // G#4
        timer.background(function() {
            play_note(415, 496.0, 47, 15, 8)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C3', 'G3', 'C2']
    if (!stop_music) {
        // C3
        timer.background(function() {
            play_note(130, 164.0, 27, 1, 9)
        })
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G3', 'D4', 'C2']
    if (!stop_music) {
        // G3
        timer.background(function() {
            play_note(195, 164.0, 34, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 164.0, 41, 1, 9)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['G#3', 'D#4', 'C2']
    if (!stop_music) {
        // G#3
        timer.background(function() {
            play_note(207, 164.0, 35, 15, 8)
        })
        // D#4
        timer.background(function() {
            play_note(311, 164.0, 42, 15, 8)
        })
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['F4', 'A#4', 'C2']
    if (!stop_music) {
        // F4
        timer.background(function() {
            play_note(349, 246.0, 44, 1, 9)
        })
        // A#4
        timer.background(function() {
            play_note(466, 246.0, 49, 15, 8)
        })
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['A#3', 'D#4', 'C2']
    if (!stop_music) {
        // A#3
        timer.background(function() {
            play_note(233, 246.0, 37, 15, 8)
        })
        // D#4
        timer.background(function() {
            play_note(311, 246.0, 42, 15, 8)
        })
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C4', 'G4', 'C2']
    if (!stop_music) {
        // C4
        timer.background(function() {
            play_note(261, 496.0, 39, 1, 9)
        })
        // G4
        timer.background(function() {
            play_note(391, 496.0, 46, 1, 9)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 131, 15, 1, 9)
    } else { return }
    // ['D#4', 'G#4', 'C2']
    if (!stop_music) {
        // D#4
        timer.background(function() {
            play_note(311, 496.0, 42, 15, 8)
        })
        // G#4
        timer.background(function() {
            play_note(415, 496.0, 47, 15, 8)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 164, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['C2']
    if (!stop_music) {
        // C2
        play_note(65, 247, 15, 1, 9)
    } else { return }
    // ['G4', 'C5', 'C#2']
    if (!stop_music) {
        // G4
        timer.background(function() {
            play_note(391, 496.0, 46, 1, 9)
        })
        // C5
        timer.background(function() {
            play_note(523, 496.0, 51, 1, 9)
        })
        // C#2
        play_note(69, 497, 16, 15, 8)
    } else { return }
    // ['C#2']
    if (!stop_music) {
        // C#2
        play_note(69, 164, 16, 15, 8)
    } else { return }
    // ['C#2']
    if (!stop_music) {
        // C#2
        play_note(69, 164, 16, 15, 8)
    } else { return }
    // ['C#2']
    if (!stop_music) {
        // C#2
        play_note(69, 164, 16, 15, 8)
    } else { return }
    // ['F4', 'A#4', 'C#2']
    if (!stop_music) {
        // F4
        timer.background(function() {
            play_note(349, 496.0, 44, 1, 9)
        })
        // A#4
        timer.background(function() {
            play_note(466, 496.0, 49, 15, 8)
        })
        // C#2
        play_note(69, 497, 16, 15, 8)
    } else { return }
    // ['C#2']
    if (!stop_music) {
        // C#2
        play_note(69, 164, 16, 15, 8)
    } else { return }
    // ['C#2']
    if (!stop_music) {
        // C#2
        play_note(69, 164, 16, 15, 8)
    } else { return }
    // ['C#2']
    if (!stop_music) {
        // C#2
        play_note(69, 164, 16, 15, 8)
    } else { return }
    // ['D4', 'G4', 'C#2']
    if (!stop_music) {
        // D4
        timer.background(function() {
            play_note(293, 496.0, 41, 1, 9)
        })
        // G4
        timer.background(function() {
            play_note(391, 496.0, 46, 1, 9)
        })
        // C#2
        play_note(69, 497, 16, 15, 8)
    } else { return }
    // ['C#2']
    if (!stop_music) {
        // C#2
        play_note(69, 164, 16, 15, 8)
    } else { return }
    // ['C#2']
    if (!stop_music) {
        // C#2
        play_note(69, 164, 16, 15, 8)
    } else { return }
    // ['C#2']
    if (!stop_music) {
        // C#2
        play_note(69, 164, 16, 15, 8)
    } else { return }
    // ['C4', 'F4', 'C#2']
    if (!stop_music) {
        // C4
        timer.background(function() {
            play_note(261, 246.0, 39, 1, 9)
        })
        // F4
        timer.background(function() {
            play_note(349, 246.0, 44, 1, 9)
        })
        // C#2
        play_note(69, 247, 16, 15, 8)
    } else { return }
    // ['C#2']
    if (!stop_music) {
        // C#2
        play_note(69, 247, 16, 15, 8)
    } else { return }
    // ['C#2']
    if (!stop_music) {
        // C#2
        play_note(69, 247, 16, 15, 8)
    } else { return }
    // ['C#2']
    if (!stop_music) {
        // C#2
        play_note(69, 247, 16, 15, 8)
    } else { return }
    // ['A3', 'D4', 'D2']
    if (!stop_music) {
        // A3
        timer.background(function() {
            play_note(220, 496.0, 36, 1, 9)
        })
        // D4
        timer.background(function() {
            play_note(293, 496.0, 41, 1, 9)
        })
        // D2
        play_note(73, 497, 17, 1, 9)
    } else { return }
    // ['D2']
    if (!stop_music) {
        // D2
        play_note(73, 164, 17, 1, 9)
    } else { return }
    // ['D2']
    if (!stop_music) {
        // D2
        play_note(73, 164, 17, 1, 9)
    } else { return }
    // ['D2']
    if (!stop_music) {
        // D2
        play_note(73, 164, 17, 1, 9)
    } else { return }
    // ['D2']
    if (!stop_music) {
        // D2
        play_note(73, 497, 17, 1, 9)
    } else { return }
    // ['D2']
    if (!stop_music) {
        // D2
        play_note(73, 164, 17, 1, 9)
    } else { return }
    // ['D2']
    if (!stop_music) {
        // D2
        play_note(73, 164, 17, 1, 9)
    } else { return }
    // ['D2']
    if (!stop_music) {
        // D2
        play_note(73, 164, 17, 1, 9)
    } else { return }
    // ['A#3', 'D#4', 'D2']
    if (!stop_music) {
        // A#3
        timer.background(function() {
            play_note(233, 496.0, 37, 15, 8)
        })
        // D#4
        timer.background(function() {
            play_note(311, 496.0, 42, 15, 8)
        })
        // D2
        play_note(73, 497, 17, 1, 9)
    } else { return }
    // ['D2']
    if (!stop_music) {
        // D2
        play_note(73, 164, 17, 1, 9)
    } else { return }
    // ['D2']
    if (!stop_music) {
        // D2
        play_note(73, 164, 17, 1, 9)
    } else { return }
    // ['D2']
    if (!stop_music) {
        // D2
        play_note(73, 164, 17, 1, 9)
    } else { return }
    // []
    if (!stop_music) {
    } else { return }
    // ['D4', 'D2']
    if (!stop_music) {
        // D4
        timer.background(function() {
            play_note(293, 246.0, 41, 1, 9)
        })
        // D2
        play_note(73, 247, 17, 1, 9)
    } else { return }
    // ['D2']
    if (!stop_music) {
        // D2
        play_note(73, 247, 17, 1, 9)
    } else { return }
    // ['D2']
    if (!stop_music) {
        // D2
        play_note(73, 247, 17, 1, 9)
    } else { return }
    // ['D2']
    if (!stop_music) {
        // D2
        play_note(73, 247, 17, 1, 9)
    } else { return }
    // ['C3', 'C4', 'C2']
    if (!stop_music) {
        // C3
        timer.background(function() {
            play_note(130, 496.0, 27, 1, 9)
        })
        // C4
        timer.background(function() {
            play_note(261, 496.0, 39, 1, 9)
        })
        // C2
        play_note(65, 497, 15, 1, 9)
    } else { return }
}
music.stopAllSounds()
function play_note(freq: number, length: number, key_number: number, from_color: number, to_color: number) {
    music.playTone(freq, length)
}
play_song()
    })
pause(50000)
})
}
const powerUp = new PowereUp(img`
    . . . . . . . .
    . . 7 7 7 7 7 .
    . 7 7 1 1 1 7 7
    . 7 7 1 7 1 7 7
    . 7 7 1 1 1 7 7
    . 7 7 1 7 7 7 7
    . 7 7 1 7 7 7 7
    . . 7 7 7 7 7 .
`, SpriteKind.Powerup, 3000, 50);
const bombPowerUp = new PowereUp(img`
    . 6 6 6 6 . . c
    6 6 6 6 6 6 c .
    . b b b b . . c
`, SpriteKind.BombPowerup, 10000, 50);
const lifePowerUp = new PowereUp(img`
    . 2 2 . . 2 2 .
    2 2 2 2 2 2 3 2
    2 2 2 2 2 3 2 2
    c 2 2 2 2 2 2 2
    . c 2 2 2 2 2 .
    . . c 2 2 2 . .
    . . . c 2 . . .
`, SpriteKind.LifePowerup, 10000, 40);

StoryBook.play();
