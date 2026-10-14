import zlib
import struct
import math

def make_png(width, height, rgba_data):
    def chunk(tag, data):
        return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)
    
    ihdr = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    raw = b''.join(b'\x00' + rgba_data[y*width*4:(y+1)*width*4] for y in range(height))
    idat = zlib.compress(raw, 9)
    return b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', ihdr) + chunk(b'IDAT', idat) + chunk(b'IEND', b'')

def render_avatar(mouth_open=False, width=512, height=512):
    # RGBA buffer
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
                # rotate back
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

    # Base colors
    WHITE = (255, 255, 255, 255)
    CREAM = (248, 246, 240, 255)
    PINK = (255, 180, 195, 255)
    DARK_PINK = (250, 130, 155, 255)
    PURPLE_HAIR = (130, 115, 220, 255)
    DARK_PURPLE = (90, 75, 170, 255)
    EYE_COLOR = (70, 50, 140, 255)
    BLACK = (45, 40, 60, 255)
    GOLD = (255, 205, 70, 255)
    RED_MOUTH = (235, 75, 95, 255)

    # 1. Ears
    # Left Ear
    fill_ellipse(170, 150, 50, 75, PURPLE_HAIR, angle=-0.35)
    fill_ellipse(170, 155, 32, 55, PINK, angle=-0.35)
    # Right Ear
    fill_ellipse(342, 150, 50, 75, PURPLE_HAIR, angle=0.35)
    fill_ellipse(342, 155, 32, 55, PINK, angle=0.35)

    # 2. Body / Shoulders
    fill_ellipse(256, 440, 140, 90, CREAM)
    fill_ellipse(256, 440, 120, 80, PURPLE_HAIR)
    # Ribbon / Bowtie
    fill_ellipse(226, 410, 30, 18, DARK_PINK, angle=0.3)
    fill_ellipse(286, 410, 30, 18, DARK_PINK, angle=-0.3)
    fill_circle(256, 410, 14, GOLD)

    # 3. Head
    fill_circle(256, 270, 135, CREAM)

    # 4. Hair bangs (cute anime chibi hair)
    fill_ellipse(180, 190, 60, 45, PURPLE_HAIR, angle=-0.2)
    fill_ellipse(332, 190, 60, 45, PURPLE_HAIR, angle=0.2)
    fill_ellipse(256, 175, 70, 40, PURPLE_HAIR)
    fill_ellipse(220, 205, 35, 45, PURPLE_HAIR, angle=0.1)
    fill_ellipse(292, 205, 35, 45, PURPLE_HAIR, angle=-0.1)

    # 5. Blush
    fill_ellipse(190, 310, 25, 14, (255, 160, 175, 180))
    fill_ellipse(322, 310, 25, 14, (255, 160, 175, 180))

    # 6. Eyes
    # Left Eye
    fill_ellipse(205, 265, 22, 28, EYE_COLOR)
    fill_circle(198, 255, 8, WHITE) # highlight 1
    fill_circle(212, 272, 4, WHITE) # highlight 2
    # Right Eye
    fill_ellipse(307, 265, 22, 28, EYE_COLOR)
    fill_circle(300, 255, 8, WHITE) # highlight 1
    fill_circle(314, 272, 4, WHITE) # highlight 2

    # Eyelashes
    fill_ellipse(205, 240, 25, 5, BLACK, angle=-0.05)
    fill_ellipse(307, 240, 25, 5, BLACK, angle=0.05)

    # Cute tiny nose
    fill_circle(256, 290, 3, (220, 140, 150, 220))

    # 7. Mouth (Closed vs Open)
    if not mouth_open:
        # Cute :3 closed mouth
        # Left curve
        fill_ellipse(247, 318, 12, 8, BLACK)
        fill_ellipse(247, 315, 11, 7, CREAM) # hollow out
        # Right curve
        fill_ellipse(265, 318, 12, 8, BLACK)
        fill_ellipse(265, 315, 11, 7, CREAM) # hollow out
    else:
        # Happy wide open mouth :D
        fill_ellipse(256, 328, 22, 20, BLACK)
        fill_ellipse(256, 328, 19, 17, RED_MOUTH)
        # Cute tongue
        fill_ellipse(256, 336, 14, 10, PINK)
        # Upper teeth
        fill_ellipse(256, 317, 12, 5, WHITE)

    return make_png(width, height, bytes(buf))

with open('pngtuber/closed.png', 'wb') as f:
    f.write(render_avatar(mouth_open=False))
print("Generated pngtuber/closed.png successfully")

with open('pngtuber/open.png', 'wb') as f:
    f.write(render_avatar(mouth_open=True))
print("Generated pngtuber/open.png successfully")

# Also copy to pngtuber/assets/ for clean organization
with open('pngtuber/assets/closed.png', 'wb') as f:
    f.write(render_avatar(mouth_open=False))
with open('pngtuber/assets/open.png', 'wb') as f:
    f.write(render_avatar(mouth_open=True))
print("Copied to pngtuber/assets/ as well")
