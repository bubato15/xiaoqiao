"""Draw the XiaoQiao illustrations through the Gemini web helper of trainning_noi_that."""
import os
import sys

sys.path.insert(0, r"C:\Code\trainning_noi_that")
os.chdir(r"C:\Code\trainning_noi_that")  # xoa_logo is imported relative to this folder
import gemini_web  # noqa: E402

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "gemini")
os.makedirs(OUT, exist_ok=True)

STYLE = (
    "Style: adorable kawaii illustration with soft hand-drawn Chinese ink brush outlines in warm dark brown-black, "
    "filled with gentle flat pastel watercolor (mint green, peach, blush pink, cream), clean and high quality, "
    "like a premium sticker set for a cute Mandarin learning app. No text, no letters, no watermark."
)

PANDA = (
    "Create a character sheet of ONE mascot: XiaoQiao, a chibi baby giant panda girl. Big round head, black ears, "
    "black eye patches with big sparkly friendly eyes, rosy pink blush cheeks, tiny black nose, a small red ribbon bow "
    "on her right ear, chubby white body with black arms and legs, sitting pose. "
    "Show exactly FIVE poses of the SAME character in one single horizontal row, evenly spaced, same size, "
    "each fully visible with wide empty space between them and around the edges, nothing touching or overlapping: "
    "1) happy, gentle smile, paws on lap; "
    "2) waving hello with her right paw raised high, big open smile; "
    "3) listening carefully, one paw cupped behind her ear, curious eyes looking up; "
    "4) cheering with both paws raised, eyes closed in joy, open mouth, two small golden stars near her; "
    "5) encouraging, a soft kind smile with one paw making a small fist of support. "
    + STYLE
    + " Background: one completely flat solid pure green color #00FF00 everywhere, no shadows, no ground, no gradient."
)

SCENES = (
    "Create a 4 columns by 2 rows grid of EIGHT separate small square illustrations, each in its own rounded square "
    "panel with a cream rice paper background and a thin gap between panels. In every panel the same cute chibi baby "
    "panda mascot (white body, black ears and eye patches, rosy cheeks, small red bow on right ear) plays a role in a "
    "everyday scene in China. Row 1: (1) panda as a barista at a bubble milk tea shop counter holding a cup of boba tea; "
    "(2) two friends saying hello, the panda student with a backpack meeting a cute bunny student on campus; "
    "(3) panda as a fruit seller at a market stall with watermelons, apples and bananas; "
    "(4) panda as a taxi driver waving from a yellow-green Chinese city taxi. "
    "Row 2: (5) panda helping a lost traveler, pointing the way at a street sign with arrows; "
    "(6) panda as a hotel receptionist at a front desk with a small bell and room key; "
    "(7) panda as a kind doctor with a white coat and stethoscope; "
    "(8) panda in a tidy shirt at a job interview at a desk with a folder. "
    + STYLE
)

MOUNTAINS = (
    "A wide panoramic Chinese shan shui ink wash landscape banner: soft rolling misty mountains in layered mint green "
    "and peach pastel watercolor washes with gentle ink brush ridges, a few bamboo stalks on the left and right edges, "
    "a small soft blush pink sun near the upper right, a tiny pagoda far away on one hill, flowing mist. "
    "Cute and calm, airy, lots of empty space at the top. "
    "The whole background and sky is plain flat warm cream rice paper color #F7EEDD, the painting fades softly into it "
    "at the top, left and right edges. No border, no frame, no seal, no text."
)

def grid(scenes):
    rows = " ".join(f"({k + 1}) {s};" for k, s in enumerate(scenes))
    return (
        "Using the attached image as the exact style and character reference, create a NEW 4 columns by 2 rows grid "
        "of EIGHT separate square illustrations in exactly the same layout: rounded square panels, same size, same gaps, "
        "same cream rice paper page around them, same chibi baby panda girl (white body, black ears and eye patches, "
        "rosy cheeks, small red bow on her right ear), same soft ink outline and pastel watercolor look. "
        "Panels in reading order, left to right then next row: " + rows + " " + STYLE
    )


MORE = {
    "scenes2": [
        "the panda showing a framed family photo of a mom, dad and little brother panda to a curious bunny friend",
        "the panda chatting with an old neighbor cat in the morning outside a building, a sun and small clouds above",
        "the panda smiling while talking on a smartphone, a calendar on the wall behind",
        "the panda painting on a small easel next to a guitar and a stack of books, hobby time",
        "the panda in sportswear holding a football next to a bunny friend jogging in a park",
        "the panda as a landlord showing a cozy small apartment room with a bed and window, holding keys",
        "the panda as a cheerful hairdresser with scissors and comb behind a customer bunny in a salon chair",
        "the panda as a waiter in a Chinese restaurant holding a menu next to a round table with dumplings and noodles",
    ],
    "scenes3": [
        "the panda as a clothing shop assistant holding up a cute T-shirt beside clothes racks",
        "the panda in an apron cooking in a wok in a home kitchen, teaching a bunny friend",
        "the panda as a phone shop customer service clerk at a counter with a broken phone and a new box",
        "the panda as a ticket seller at a high speed rail station window, a sleek white bullet train behind",
        "the panda as a travel agent pointing at a big map with pins and a little suitcase nearby",
        "the panda at a metro station lost and found counter holding a lost backpack and umbrella",
        "the panda as an airport check-in agent at a counter with a suitcase on the belt and a plane outside the window",
        "the panda as a kind Chinese teacher at a blackboard with simple chalk doodles welcoming a new student",
    ],
    "scenes4": [
        "the panda as a librarian at a library desk stamping a book, tall bookshelves behind",
        "the panda as a bank teller behind a glass counter exchanging banknotes",
        "the panda as a team leader in an office meeting room pointing at a simple bar chart on a whiteboard",
        "the panda in a suit shaking hands with a business partner fox across a table with coffee and a contract",
        "the panda listening excitedly as a friend shows photos of Vietnam: conical hats, a lotus and a bowl of pho",
        "the panda and a friend at the cinema with popcorn and music notes floating around",
        "the panda reading a newspaper and discussing it with an owl friend over tea",
        "the panda and a fox politely debating at two small podiums, speech bubbles with simple icons, no letters",
    ],
    # Careers: the panda is the professional, animal friends are the Chinese customers or bosses.
    "scenes5": [
        "the panda as a waitress in an apron serving a steaming bowl of Vietnamese pho to a bunny tourist at a table",
        "the panda as a delivery courier in a cap handing a parcel box to a cat at an apartment door, a scooter behind",
        "the panda as a pharmacist in a white coat behind a pharmacy counter handing a small medicine box to a sick bear",
        "the panda as a teacher pointing at a small whiteboard with simple doodles, teaching a fox student at a desk",
        "the panda as a tour guide holding a small flag, leading a group of animal tourists past a one pillar pagoda by a lake",
        "the panda as a veterinarian with a stethoscope gently checking a fluffy puppy on an exam table, its owner bunny watching",
        "the panda as a farmer in a conical hat at a dragon fruit farm holding a basket of pink dragon fruits, a buyer fox nearby",
        "the panda as a factory worker in a safety helmet and vest next to a conveyor belt with boxes, a supervisor bear with a clipboard",
    ],
    "scenes6": [
        "the panda as a nurse in a pink uniform taking the temperature of a bunny patient sitting on a hospital bed",
        "the panda as a cheerful livestream seller holding up a skincare bottle in front of a phone on a ring light stand",
        "the panda as a programmer at a desk with two monitors showing colorful code blocks, a manager owl pointing at the screen",
        "the panda as a real estate agent showing a bright modern apartment with a big window and city view to a deer couple",
        "the panda as an interior designer holding color swatches and a floor plan next to a sofa, talking with a cat client",
        "the panda as a business consultant at an office desk explaining a folder of documents to an investor tiger in a suit",
        "the panda as a news reporter holding a microphone interviewing a smiling businessman fox, a small camera on a tripod",
        "the panda presenting a startup pitch next to a screen with a rising arrow chart, three investor animals listening at a table",
    ],
    "scenes7": [
        "the panda as a flight attendant in a neat uniform pushing a drinks cart down an airplane aisle, a bunny passenger asking",
        "the panda as a nail and spa technician painting the nails of a relaxed cat customer, little bottles of polish and a towel",
        "the panda as a hotel front desk receptionist handing a room key card to a deer guest with a suitcase, a small bell on the desk",
        "the panda as a chef in a tall white hat cooking in an open restaurant kitchen while a fox customer watches from the counter",
        "the panda as a fitness coach in sportswear holding a clipboard next to a chubby bear lifting small dumbbells in a gym",
        "the panda as a bank teller behind a counter helping a tiger customer fill in a form, a card and a pen on the desk",
        "the panda as an HR recruiter at a desk with a resume, interviewing a nervous owl candidate in a shirt and tie",
        "the panda as a logistics officer with a clipboard at a port, colorful shipping containers and a crane behind, a supplier fox on the phone",
    ],
}

JOBS = {
    "panda": (PANDA, "16:9", []),
    "scenes": (SCENES, "16:9", []),
    "mountains": (MOUNTAINS, "16:9", []),
    **{k: (grid(v), "16:9", [os.path.join(OUT, "scenes.png")]) for k, v in MORE.items()},
}

_save = gemini_web._save


def save_or_grab(page, img, out_path):
    """The full size download sometimes comes back empty; then take the image shown in the chat instead."""
    try:
        path = _save(page, img, out_path)
        if os.path.getsize(path) > 0:
            return path
    except Exception as e:
        print("download failed, grabbing the shown image:", type(e).__name__, flush=True)
    import base64
    data = img.evaluate(
        """async (el) => {
            const blob = await (await fetch(el.src, { credentials: "include" })).blob();
            return await new Promise((ok) => { const r = new FileReader(); r.onload = () => ok(r.result); r.readAsDataURL(blob); });
        }"""
    )
    path = os.path.splitext(out_path)[0] + ".png"
    with open(path, "wb") as f:
        f.write(base64.b64decode(data.split(",", 1)[1]))
    return path


gemini_web._save = save_or_grab

for name in sys.argv[1:] or JOBS:
    prompt, aspect, refs = JOBS[name]
    print("drawing", name, flush=True)
    try:
        path = gemini_web.render(prompt, refs, os.path.join(OUT, name + ".png"), timeout=600,
                                 thinking="cao", aspect=aspect)
        print("saved", path, flush=True)
    except Exception as e:  # keep going with the other images
        print("failed", name, type(e).__name__, str(e)[:300], flush=True)

