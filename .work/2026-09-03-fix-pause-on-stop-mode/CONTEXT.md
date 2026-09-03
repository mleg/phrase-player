# Phrase Player

A browser player for language learning: it plays an audio file phrase by phrase, using an SRT file as the source of phrases, and helps the learner navigate and repeat them.

## Language

**Phrase**:
A single subtitle unit with a start and end time inside the loaded audio.
_Avoid_: line, cue

**After phrase mode**:
The user-selected behavior when playback reaches the end of the current phrase: Stop, Repeat, or Continue.
_Avoid_: playback mode, player mode

**Self-stop**:
The pause that happens on its own when playback reaches the end of the current phrase in Stop mode. Navigating to another phrase while self-stopped keeps the self-stop; any explicit play action clears it.
_Avoid_: auto-pause, natural pause

**User pause**:
A pause caused by the user, for example by toggling playback.
_Avoid_: manual pause
