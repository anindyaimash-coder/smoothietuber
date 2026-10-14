import zlib
import struct
import math
import os

def make_png(width, height, rgba_data):
    def chunk(tag, data):
        return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)
    
    ihdr = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    raw = b''.join(b'\x00' + rgba_data[y*width*4:(y+1)*width*4] for y in range(height))
    idat = zlib.compress(raw, 9)
    return b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', ihdr) + chunk(b'IDAT', idat) + chunk(b'IEND', b'')

def render_sprite(emotion='normal', mouth_open=False, blink=False, width=512, height=512):
    buf = bytearray(width * height * 4)

    def blend_pixel(x, y, r, g, b, a):
        if not (0 <= x < width and 0 <= y < height):
            return
        idx = (y * width + x) * 4
        src_a = a / 255.0
        dst_a = buf[idx+3] / 255.0
        out_a = src_a + dst_a * (1.0 - src_a)
        if out_a > 0.0001:
            out_r = (r * src_a + buf[idx] * dst_a * (1.0 - src_a)) / out_a
            out_g = (g * src_a + buf[idx+1] * dst_a * (1.0 - src_a)) / out_a
            out_b = (b * src_a + buf[idx+2] * dst_a * (1.0 - src_a)) / out_a
            buf[idx] = int(round(out_r))
            buf[idx+1] = int(round(out_g))
            buf[idx+2] = int(round(out_b))
            buf[idx+3] = int(round(out_a * 255.0))

    def fill_circle(cx, cy, r, color):
        r_f = float(r)
        cr, cg, cb, ca = color
        min_x = max(0, int(cx - r - 2))
        max_x = min(width - 1, int(cx + r + 2))
        min_y = max(0, int(cy - r - 2))
        max_y = min(height - 1, int(cy + r + 2))
        for y in range(min_y, max_y + 1):
            for x in range(min_x, max_x + 1):
                d = math.hypot(x - cx, y - cy)
                if d <= r_f - 0.5:
                    blend_pixel(x, y, cr, cg, cb, ca)
                elif d < r_f + 0.5:
                    alpha_factor = (r_f + 0.5 - d)
                    blend_pixel(x, y, cr, cg, cb, int(ca * alpha_factor))

    def fill_ellipse(cx, cy, rx, ry, color, angle=0):
        cr, cg, cb, ca = color
        cos_a = math.cos(angle)
        sin_a = math.sin(angle)
        max_r = max(rx, ry) + 2
        min_x = max(0, int(cx - max_r))
        max_x = min(width - 1, int(cx + max_r))
        min_y = max(0, int(cy - max_r))
        max_y = min(height - 1, int(cy + max_r))
        for y in range(min_y, max_y + 1):
            for x in range(min_x, max_x + 1):
                dx = x - cx
                dy = y - cy
                tx = dx * cos_a + dy * sin_a
                ty = -dx * sin_a + dy * cos_a
                d = (tx / rx)**2 + (ty / ry)**2
                if d <= 1.0:
                    edge = math.sqrt(d)
                    if edge < 0.95:
                        blend_pixel(x, y, cr, cg, cb, ca)
                    else:
                        alpha = max(0.0, min(1.0, (1.0 - edge) / 0.05))
                        blend_pixel(x, y, cr, cg, cb, int(ca * alpha))

    # Palette
    WHITE = (255, 255, 255, 255)
    CREAM = (248, 246, 240, 255)
    PINK = (255, 180, 195, 255)
    DARK_PINK = (250, 130, 155, 255)
    if emotion == 'happy':
        PURPLE_HAIR = (255, 130, 180, 255) # Pink hair for happy!
        EYE_COLOR = (220, 40, 110, 255)
    elif emotion == 'surprised':
        PURPLE_HAIR = (255, 175, 60, 255) # Warm sunny amber hair for surprised!
        EYE_COLOR = (215, 115, 30, 255)
    else:
        PURPLE_HAIR = (130, 115, 220, 255)
        EYE_COLOR = (70, 50, 140, 255)
    BLACK = (45, 40, 60, 255)
    GOLD = (255, 215, 60, 255)
    RED_MOUTH = (235, 75, 95, 255)

    # 1. Ears
    fill_ellipse(170, 150, 50, 75, PURPLE_HAIR, angle=-0.35)
    fill_ellipse(170, 155, 32, 55, PINK, angle=-0.35)
    fill_ellipse(342, 150, 50, 75, PURPLE_HAIR, angle=0.35)
    fill_ellipse(342, 155, 32, 55, PINK, angle=0.35)

    # 2. Body / Shoulders
    fill_ellipse(256, 440, 140, 90, CREAM)
    fill_ellipse(256, 440, 120, 80, PURPLE_HAIR)
    fill_ellipse(226, 410, 30, 18, DARK_PINK, angle=0.3)
    fill_ellipse(286, 410, 30, 18, DARK_PINK, angle=-0.3)
    fill_circle(256, 410, 14, GOLD)

    # 3. Head
    fill_circle(256, 270, 135, CREAM)

    # 4. Bangs
    fill_ellipse(180, 190, 60, 45, PURPLE_HAIR, angle=-0.2)
    fill_ellipse(332, 190, 60, 45, PURPLE_HAIR, angle=0.2)
    fill_ellipse(256, 175, 70, 40, PURPLE_HAIR)
    fill_ellipse(220, 205, 35, 45, PURPLE_HAIR, angle=0.1)
    fill_ellipse(292, 205, 35, 45, PURPLE_HAIR, angle=-0.1)

    # 5. Blush
    blush_alpha = 240 if emotion == 'happy' else (140 if emotion == 'surprised' else 180)
    fill_ellipse(188, 312, 26, 15, (255, 150, 175, blush_alpha))
    fill_ellipse(324, 312, 26, 15, (255, 150, 175, blush_alpha))
    if emotion == 'happy':
        # Little sparkle on cheek
        fill_circle(188, 308, 4, WHITE)
        fill_circle(324, 308, 4, WHITE)
    elif emotion == 'surprised':
        # Sweat drop on forehead / side
        fill_ellipse(350, 230, 9, 15, (100, 195, 255, 230), angle=-0.2)
        fill_circle(348, 226, 3, WHITE)

    # 6. EYES (Open vs Blink)
    if not blink:
        if emotion == 'surprised':
            # Big round surprised shocked eyes!
            fill_circle(205, 265, 26, WHITE)
            fill_circle(205, 265, 22, EYE_COLOR)
            fill_circle(205, 265, 13, BLACK)
            fill_circle(200, 258, 6, WHITE)
            fill_circle(210, 271, 3, WHITE)
            # High arched surprised brows
            fill_ellipse(205, 228, 22, 5, BLACK, angle=-0.12)

            fill_circle(307, 265, 26, WHITE)
            fill_circle(307, 265, 22, EYE_COLOR)
            fill_circle(307, 265, 13, BLACK)
            fill_circle(302, 258, 6, WHITE)
            fill_circle(312, 271, 3, WHITE)
            # High arched surprised brows
            fill_ellipse(307, 228, 22, 5, BLACK, angle=0.12)
        else:
            # Open Eyes
            fill_ellipse(205, 265, 22, 28, EYE_COLOR)
            fill_circle(198, 255, 8, WHITE)
            fill_circle(212, 272, 4, WHITE)

            fill_ellipse(307, 265, 22, 28, EYE_COLOR)
            fill_circle(300, 255, 8, WHITE)
            fill_circle(314, 272, 4, WHITE)

            # Sparkle star if happy!
            if emotion == 'happy':
                fill_circle(205, 268, 5, GOLD)
                fill_circle(307, 268, 5, GOLD)

            # Upper lashes
            fill_ellipse(205, 240, 25, 5, BLACK, angle=-0.05)
            fill_ellipse(307, 240, 25, 5, BLACK, angle=0.05)
    else:
        # Blink Eyes (Cute curved happy sleeping eyes ^ ^)
        # Left closed eye arc
        fill_ellipse(205, 265, 25, 10, BLACK)
        fill_ellipse(205, 269, 23, 9, CREAM) # cutout bottom to make upper curve
        fill_ellipse(205, 248, 20, 4, BLACK, angle=-0.05) # brow

        # Right closed eye arc
        fill_ellipse(307, 265, 25, 10, BLACK)
        fill_ellipse(307, 269, 23, 9, CREAM)
        fill_ellipse(307, 248, 20, 4, BLACK, angle=0.05) # brow

    # Nose
    fill_circle(256, 290, 3, (220, 140, 150, 220))

    # 7. MOUTH (Closed vs Open)
    if not mouth_open:
        if emotion == 'surprised':
            # Small round surprised 'o'
            fill_ellipse(256, 318, 10, 13, BLACK)
            fill_ellipse(256, 318, 8, 11, RED_MOUTH)
            fill_circle(256, 315, 3, WHITE)
        else:
            # Cute :3 mouth
            fill_ellipse(247, 318, 12, 8, BLACK)
            fill_ellipse(247, 315, 11, 7, CREAM)
            fill_ellipse(265, 318, 12, 8, BLACK)
            fill_ellipse(265, 315, 11, 7, CREAM)
    else:
        if emotion == 'surprised':
            # Wide stunned open mouth :O
            fill_ellipse(256, 332, 23, 25, BLACK)
            fill_ellipse(256, 332, 20, 22, RED_MOUTH)
            fill_ellipse(256, 342, 15, 11, PINK)
            fill_ellipse(256, 317, 13, 6, WHITE)
        else:
            # Open mouth :D
            fill_ellipse(256, 328, 22, 20, BLACK)
            fill_ellipse(256, 328, 19, 17, RED_MOUTH)
            fill_ellipse(256, 336, 14, 10, PINK)
            fill_ellipse(256, 317, 12, 5, WHITE)

    return make_png(width, height, bytes(buf))

os.makedirs('pngtuber/assets', exist_ok=True)

combos = [
    ('normal',    False, False, 'normal_closed.png'),
    ('normal',    False, True,  'normal_closed_blink.png'),
    ('normal',    True,  False, 'normal_open.png'),
    ('normal',    True,  True,  'normal_open_blink.png'),
    ('happy',     False, False, 'happy_closed.png'),
    ('happy',     False, True,  'happy_closed_blink.png'),
    ('happy',     True,  False, 'happy_open.png'),
    ('happy',     True,  True,  'happy_open_blink.png'),
    ('surprised', False, False, 'surprised_closed.png'),
    ('surprised', False, True,  'surprised_closed_blink.png'),
    ('surprised', True,  False, 'surprised_open.png'),
    ('surprised', True,  True,  'surprised_open_blink.png'),
]

for emotion, mouth_open, blink, filename in combos:
    data = render_sprite(emotion, mouth_open, blink)
    filepath = os.path.join('pngtuber/assets', filename)
    with open(filepath, 'wb') as f:
        f.write(data)
    print(f"Created {filepath}")

# Backward compatible symlinks/copies
with open('pngtuber/closed.png', 'wb') as f:
    f.write(render_sprite('normal', False, False))
with open('pngtuber/open.png', 'wb') as f:
    f.write(render_sprite('normal', True, False))
print("All 8 avatar state sprites generated successfully!")
