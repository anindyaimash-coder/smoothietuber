#!/usr/bin/env python3
"""
Generate SmoothieTuber Official Logo & Favicon
Whimsical Sketchy Line-Art & Editorial Doodle Aesthetic
Outputs:
  - pngtuber/assets/logo.png (512x512 RGBA Transparent)
  - pngtuber/assets/favicon.ico (Multi-size ICO)
  - pngtuber/favicon.ico
"""

import math
from PIL import Image, ImageDraw, ImageFilter

def create_logo_image(size=512):
    # Render at 2x for smooth supersampled antialiasing
    scale = 2
    w = size * scale
    h = size * scale
    
    img = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    INK = (43, 40, 37, 255)         # Charcoal ink line-art
    CREAM = (255, 253, 249, 250)     # Clean paper cream
    YELLOW = (253, 230, 138, 220)    # Crayon pastel yellow
    SKY_BLUE = (186, 230, 253, 210)  # Crayon pastel sky blue
    ORANGE = (253, 186, 116, 200)    # Crayon pastel peach
    PINK = (244, 114, 182, 230)      # Rose pink for ears & blush
    RED_STRAW = (244, 63, 94, 255)   # Straw stripe coral red
    WHITE = (255, 255, 255, 245)
    
    # 1. CRAYON PASTEL SPLASH BLOBS (Risograph misregistration effect)
    blob_layer = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    blob_draw = ImageDraw.Draw(blob_layer)
    
    # Soft background blobs
    blob_draw.ellipse([w*0.18, h*0.28, w*0.82, h*0.85], fill=YELLOW)
    blob_draw.ellipse([w*0.35, h*0.18, w*0.88, h*0.65], fill=SKY_BLUE)
    blob_draw.ellipse([w*0.12, h*0.48, w*0.62, h*0.88], fill=ORANGE)
    blob_layer = blob_layer.filter(ImageFilter.GaussianBlur(radius=8 * scale))
    img.paste(blob_layer, (0, 0), blob_layer)
    
    # 2. CUP BODY & DOME LID SHAPES
    # Cup dimensions
    top_y = h * 0.40
    bot_y = h * 0.84
    cup_top_w = w * 0.54
    cup_bot_w = w * 0.38
    cx = w * 0.50
    
    cup_poly = [
        (cx - cup_top_w/2, top_y),
        (cx - cup_bot_w/2, bot_y),
        (cx + cup_bot_w/2, bot_y),
        (cx + cup_top_w/2, top_y)
    ]
    draw.polygon(cup_poly, fill=WHITE)
    
    # Dome Lid (Half-ellipse)
    lid_box = [cx - cup_top_w*0.52, top_y - h*0.16, cx + cup_top_w*0.52, top_y + h*0.06]
    draw.chord(lid_box, start=180, end=0, fill=WHITE, outline=None)
    
    # Cat Ears on Dome Lid
    ear_w = w * 0.13
    ear_h = h * 0.15
    # Left ear
    left_ear_pts = [
        (cx - cup_top_w*0.42, top_y - h*0.04),
        (cx - cup_top_w*0.40 - ear_w*0.5, top_y - h*0.04 - ear_h),
        (cx - cup_top_w*0.16, top_y - h*0.12)
    ]
    draw.polygon(left_ear_pts, fill=WHITE)
    
    # Right ear
    right_ear_pts = [
        (cx + cup_top_w*0.16, top_y - h*0.12),
        (cx + cup_top_w*0.40 + ear_w*0.5, top_y - h*0.04 - ear_h),
        (cx + cup_top_w*0.42, top_y - h*0.04)
    ]
    draw.polygon(right_ear_pts, fill=WHITE)
    
    # Inner pink ears
    left_inner = [
        (cx - cup_top_w*0.38, top_y - h*0.05),
        (cx - cup_top_w*0.40 - ear_w*0.35, top_y - h*0.04 - ear_h*0.75),
        (cx - cup_top_w*0.22, top_y - h*0.11)
    ]
    draw.polygon(left_inner, fill=PINK)
    right_inner = [
        (cx + cup_top_w*0.22, top_y - h*0.11),
        (cx + cup_top_w*0.40 + ear_w*0.35, top_y - h*0.04 - ear_h*0.75),
        (cx + cup_top_w*0.38, top_y - h*0.05)
    ]
    draw.polygon(right_inner, fill=PINK)
    
    # Cup Sleeve Band
    sleeve_top = h * 0.52
    sleeve_bot = h * 0.69
    s_top_w = w * 0.50
    s_bot_w = w * 0.44
    sleeve_poly = [
        (cx - s_top_w/2, sleeve_top),
        (cx - s_bot_w/2, sleeve_bot),
        (cx + s_bot_w/2, sleeve_bot),
        (cx + s_top_w/2, sleeve_top)
    ]
    draw.polygon(sleeve_poly, fill=YELLOW)
    
    # Straw
    straw_w = 14 * scale
    straw_pts = [
        (cx + w*0.04, top_y - h*0.11),
        (cx + w*0.14, h * 0.16),
        (cx + w*0.26, h * 0.12)
    ]
    draw.line([straw_pts[0], straw_pts[1]], fill=WHITE, width=int(straw_w))
    draw.line([straw_pts[1], straw_pts[2]], fill=WHITE, width=int(straw_w))
    draw.line([straw_pts[0], straw_pts[1]], fill=INK, width=int(3.5*scale))
    draw.line([straw_pts[1], straw_pts[2]], fill=INK, width=int(3.5*scale))
    
    # Straw red candy stripes
    draw.line([(cx + w*0.07, h*0.25), (cx + w*0.10, h*0.23)], fill=RED_STRAW, width=int(6*scale))
    draw.line([(cx + w*0.12, h*0.19), (cx + w*0.14, h*0.17)], fill=RED_STRAW, width=int(6*scale))
    draw.line([(cx + w*0.18, h*0.15), (cx + w*0.20, h*0.14)], fill=RED_STRAW, width=int(6*scale))
    
    # 3. SKETCHY INK OUTLINES
    line_w = int(3.5 * scale)
    
    # Ears outlines
    draw.line([left_ear_pts[0], left_ear_pts[1], left_ear_pts[2]], fill=INK, width=line_w, joint='round')
    draw.line([right_ear_pts[0], right_ear_pts[1], right_ear_pts[2]], fill=INK, width=line_w, joint='round')
    
    # Dome Lid outline
    draw.arc(lid_box, start=180, end=0, fill=INK, width=line_w)
    draw.line([(cx - cup_top_w*0.52, top_y), (cx + cup_top_w*0.52, top_y)], fill=INK, width=line_w)
    
    # Cup outlines
    draw.line([(cx - cup_top_w/2, top_y), (cx - cup_bot_w/2, bot_y)], fill=INK, width=line_w)
    draw.line([(cx + cup_top_w/2, top_y), (cx + cup_bot_w/2, bot_y)], fill=INK, width=line_w)
    draw.line([(cx - cup_bot_w/2, bot_y), (cx + cup_bot_w/2, bot_y)], fill=INK, width=line_w)
    
    # Sleeve outlines
    draw.line([(cx - s_top_w/2, sleeve_top), (cx + s_top_w/2, sleeve_top)], fill=INK, width=int(2.5*scale))
    draw.line([(cx - s_bot_w/2, sleeve_bot), (cx + s_bot_w/2, sleeve_bot)], fill=INK, width=int(2.5*scale))
    
    # 4. CUTE KAWAII FACE ON CUP SLEEVE
    face_y = (sleeve_top + sleeve_bot) / 2
    eye_offset = w * 0.085
    eye_r = 7 * scale
    
    # Eyes (Ink with white specular highlight)
    draw.ellipse([cx - eye_offset - eye_r, face_y - eye_r, cx - eye_offset + eye_r, face_y + eye_r], fill=INK)
    draw.ellipse([cx + eye_offset - eye_r, face_y - eye_r, cx + eye_offset + eye_r, face_y + eye_r], fill=INK)
    
    # Highlights
    h_r = 2.5 * scale
    draw.ellipse([cx - eye_offset - h_r, face_y - eye_r*0.6, cx - eye_offset + h_r*0.2, face_y], fill=WHITE)
    draw.ellipse([cx + eye_offset - h_r, face_y - eye_r*0.6, cx + eye_offset + h_r*0.2, face_y], fill=WHITE)
    
    # Cute :3 Cat Mouth
    mouth_y = face_y + 4 * scale
    draw.arc([cx - 16*scale, mouth_y - 8*scale, cx, mouth_y + 8*scale], start=10, end=170, fill=INK, width=int(2.5*scale))
    draw.arc([cx, mouth_y - 8*scale, cx + 16*scale, mouth_y + 8*scale], start=10, end=170, fill=INK, width=int(2.5*scale))
    
    # Cute Cheek Blushes
    blush_rx = 9 * scale
    blush_ry = 5 * scale
    draw.ellipse([cx - eye_offset - blush_rx - 10*scale, face_y + 5*scale, cx - eye_offset + blush_rx - 10*scale, face_y + 5*scale + blush_ry*2], fill=PINK)
    draw.ellipse([cx + eye_offset - blush_rx + 10*scale, face_y + 5*scale, cx + eye_offset + blush_rx + 10*scale, face_y + 5*scale + blush_ry*2], fill=PINK)
    
    # 5. WHIMSICAL SPARKLES & EDITORIAL DOODLE ACCENTS
    def draw_star(sx, sy, r, col):
        sw = int(2.5 * scale)
        draw.line([(sx - r, sy), (sx + r, sy)], fill=col, width=sw)
        draw.line([(sx, sy - r), (sx, sy + r)], fill=col, width=sw)
        draw.line([(sx - r*0.6, sy - r*0.6), (sx + r*0.6, sy + r*0.6)], fill=col, width=int(sw*0.7))
        draw.line([(sx - r*0.6, sy + r*0.6), (sx + r*0.6, sy - r*0.6)], fill=col, width=int(sw*0.7))

    draw_star(w * 0.15, h * 0.22, 16 * scale, (245, 158, 11, 240))  # Amber star
    draw_star(w * 0.85, h * 0.35, 14 * scale, (14, 165, 233, 240))  # Cyan star
    draw_star(w * 0.22, h * 0.75, 10 * scale, (244, 63, 94, 220))   # Rose star
    
    # Little bubble sparkles
    draw.ellipse([w*0.80, h*0.70, w*0.80 + 12*scale, h*0.70 + 12*scale], outline=INK, width=int(2*scale), fill=(255,255,255,180))
    draw.ellipse([w*0.84, h*0.64, w*0.84 + 7*scale, h*0.64 + 7*scale], fill=SKY_BLUE)
    
    # Downsample with Lanczos for crisp, anti-aliased output
    final_img = img.resize((size, size), Image.Resampling.LANCZOS)
    return final_img

def main():
    print("Generating SmoothieTuber official logo.png and favicon.ico...")
    
    # 1. High-res logo (512x512)
    logo_512 = create_logo_image(512)
    logo_path = 'pngtuber/assets/logo.png'
    logo_512.save(logo_path, format='PNG', optimize=True)
    print(f"✅ Created {logo_path}")
    
    # 2. Multi-size favicon.ico (16, 32, 48, 64)
    icon_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
    ico_img = create_logo_image(128)
    ico_path = 'pngtuber/assets/favicon.ico'
    ico_img.save(ico_path, format='ICO', sizes=icon_sizes)
    print(f"✅ Created {ico_path}")
    
    # Also save to root for web servers / browser auto-discovery
    root_ico_path = 'pngtuber/favicon.ico'
    ico_img.save(root_ico_path, format='ICO', sizes=icon_sizes)
    print(f"✅ Created {root_ico_path}")

if __name__ == '__main__':
    main()
