import "dotenv/config";
import { PrismaClient, Role } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const CATEGORIES = [
  { id: "microcontrollers", name: "Microcontrollers", icon: "memory", color: "bg-primary-fixed text-primary" },
  { id: "sensors", name: "Sensors", icon: "sensors", color: "bg-secondary-fixed text-secondary" },
  { id: "iot", name: "IoT Modules", icon: "wifi", color: "bg-tertiary-fixed text-tertiary" },
  { id: "kits", name: "Robotics Kits", icon: "inventory_2", color: "bg-outline-variant/30 text-on-surface-variant" },
  { id: "motors", name: "Motors & Actuators", icon: "settings_input_component", color: "bg-secondary-container text-on-secondary-container" },
  { id: "accessories", name: "Accessories", icon: "build", color: "bg-surface-variant text-on-surface-variant" },
];

const PRODUCTS = [
  {
    id: "arduino-uno",
    name: "Arduino Uno Rev3 Board",
    categoryId: "microcontrollers",
    price: 15000,
    description:
      "The standard microcontroller board for beginner and advanced prototyping. Features the ATmega328P processor, 14 digital input/output pins, and 6 analog inputs.",
    rating: 4.8,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtLbjdsNAZdxUlYrOVoU9NXptSTpIZBGvWqK8SNkq0YO7CzkK4yCO_KKUunK3DLlV1EJZeNofudlJM7-ugtGBWfUjOKP64ZEXznlqTQkhSarcSiP3F5EtW-XSWP7aFkKbApiEeor4U6_YyWfI-36ZNVI_NNFC-8ijkZIFY2ggy6ijDtPhUI50FKGFxVe4Q6U9B60nldLJh1YlmwDkaCAaKhSa8EI3aBsekPZ7Fne-3nxXQH-qveYRq0EfmhC1jqaRhZSjTdUvTzoI",
    stock: 45,
    tag: "Popular",
    specs: {
      Microcontroller: "ATmega328P",
      "Operating Voltage": "5V",
      "Input Voltage (recommended)": "7-12V",
      "Digital I/O Pins": "14 (of which 6 provide PWM output)",
      "Analog Input Pins": "6",
      "Flash Memory": "32 KB (ATmega328P) of which 0.5 KB used by bootloader",
      SRAM: "2 KB (ATmega328P)",
      EEPROM: "1 KB (ATmega328P)",
      "Clock Speed": "16 MHz",
    },
  },
  {
    id: "raspberry-pi-3",
    name: "Raspberry Pi 3 Model B",
    categoryId: "microcontrollers",
    price: 70000,
    description:
      "The classic single-board computer from Raspberry Pi. Features a 1.2GHz 64-bit quad-core ARMv8 CPU, onboard 802.11n Wi-Fi, Bluetooth 4.1, and 1GB RAM.",
    rating: 4.7,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOQXVukoX0ai2ferdZoBd1kDDwMru0SOVxMLjn6_AANeTubPZytDSXFBVX6vDozjebyoW7gN9JinKd2vGTHpNqn23yGy5zasZd7rzex_gQfkMGzvm88gThw0oSe6RxJdt2O9k-bIw8wL_vEgH9xASp8S9rzzaEc7b71Dd2k2fgeVrOIevTGt2Qe8JKmhT_zbT_sTmqiU2Jlg-7XrlazTep0M4VZttsWZ3wJoE_1f_yViKJfLA991a6ehF3ZS-N6O9SZLyTzzmChPQ",
    stock: 12,
    tag: "Best Seller",
    specs: {
      Processor: "Broadcom BCM2837 64-bit Quad-Core",
      "Clock Speed": "1.2 GHz",
      RAM: "1 GB LPDDR2",
      Connectivity: "2.4GHz WiFi, Bluetooth 4.1, Ethernet",
      "USB Ports": "4 x USB 2.0",
      GPIO: "44-pin Header",
      HDMI: "1 x Full-size",
      Storage: "MicroSD card slot",
    },
  },
  {
    id: "hc-sr04",
    name: "HC-SR04 Ultrasonic Sensor",
    categoryId: "sensors",
    price: 5000,
    description:
      "A classic distance measuring sensor module using ultrasonic pulses. Ideal for collision avoidance, navigation in robotics, and fluid level measurements.",
    rating: 4.5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHfL4D_eNBkflb4LYMWKOkjAaTb_ztyOKpIRSYq_cjy3vB1Wzsa4wXUcPfh4FuZutGQlFRO6cy6MbidaVFryC040Gcnc3fpO66o6AFjGZg6LncUYfoqtYw3xN5FmzziVwu-CDSRHw0qx8tJI8OUzJyWauSkzza0okp58VibsQsKBY-AIUkKDAIiDGPF0D2acMOkqBDhvasrMHU9FLysgisjwFz66lVsz3ee1cWA9pHbvHBDci5aOMnGBykY5ZkwLmLoU7YDcXi1dc",
    stock: 120,
    tag: "Essential",
    specs: {
      "Operating Voltage": "5V DC",
      "Operating Current": "15mA",
      "Operating Frequency": "40KHz",
      "Max Range": "4m",
      "Min Range": "2cm",
      "Measuring Angle": "15 degrees",
      "Trigger Input Signal": "10uS TTL pulse",
    },
  },
  {
    id: "wemos-d1-mini",
    name: "ESP8266 WeMos D1 Mini",
    categoryId: "iot",
    price: 10000,
    description:
      "A miniature WiFi development board based on ESP-8266EX. Compatible with Arduino, NodeMCU, and MicroPython, perfect for budget IoT projects and smart home automation.",
    rating: 4.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5aFjg18LUSPjC2ZO4cfqPmDfEz_ii8yf59x_IjESmRnSB_rVuQX_pWgYhbb-rOjb5awvkPwQoKlWPqT3wo8fAeA9Y5eqEXTabbPP0Z4D5k6nNa-kjeVHfTBPnX45GIHtflYf868AOZK5xzWThP3a7Y5vDb-lMJ1S9GY6ifdHEYy6lW9EKBvFK-W_6JG5BDeQWO0JIUQRzaqkkGLDBhn-WsKRhGWkIoAliOI4Cy18W_oQKnj1U_9p9cCac5W4xdlOW0ycyer5hBbw",
    stock: 75,
    tag: "IoT Star",
    specs: {
      Microcontroller: "ESP-8266EX",
      "Operating Voltage": "3.3V",
      "Digital I/O Pins": "11 (all support interrupts/PWM/I2C/1-wire)",
      "Analog Input Pins": "1 (max input 3.2V)",
      "Flash Memory": "4 MB",
      "Clock Speed": "80MHz / 160MHz",
      WiFi: "Built-in 802.11 b/g/n",
    },
  },
  {
    id: "raspberry-pi-4",
    name: "Raspberry Pi 4 Model B (4GB)",
    categoryId: "microcontrollers",
    price: 95000,
    description:
      "The powerful latest generation single-board computer from Raspberry Pi. Features 4GB LPDDR4 RAM, dual HDMI 4K display support, gigabit ethernet, USB 3.0, and USB-C power input.",
    rating: 4.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOQXVukoX0ai2ferdZoBd1kDDwMru0SOVxMLjn6_AANeTubPZytDSXFBVX6vDozjebyoW7gN9JinKd2vGTHpNqn23yGy5zasZd7rzex_gQfkMGzvm88gThw0oSe6RxJdt2O9k-bIw8wL_vEgH9xASp8S9rzzaEc7b71Dd2k2fgeVrOIevTGt2Qe8JKmhT_zbT_sTmqiU2Jlg-7XrlazTep0M4VZttsWZ3wJoE_1f_yViKJfLA991a6ehF3ZS-N6O9SZLyTzzmChPQ",
    stock: 8,
    tag: "High Performance",
    specs: {
      Processor: "Broadcom BCM2711 quad-core Cortex-A72",
      RAM: "4 GB LPDDR4",
      Connectivity: "Dual-band WiFi, Bluetooth 5.0, Gigabit Ethernet",
      "USB Ports": "2 x USB 3.0, 2 x USB 2.0",
      HDMI: "2 x Micro-HDMI (supports up to 4kp60)",
      Power: "5V DC via USB-C",
    },
  },
  {
    id: "esp32-devkit",
    name: "ESP32 NodeMCU Development Board",
    categoryId: "iot",
    price: 12000,
    description:
      "An advanced dual-core microchip with integrated Wi-Fi and Bluetooth. Ideal for high-end IoT applications, security protocols, sensor hubs, and camera feeds.",
    rating: 4.8,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5aFjg18LUSPjC2ZO4cfqPmDfEz_ii8yf59x_IjESmRnSB_rVuQX_pWgYhbb-rOjb5awvkPwQoKlWPqT3wo8fAeA9Y5eqEXTabbPP0Z4D5k6nNa-kjeVHfTBPnX45GIHtflYf868AOZK5xzWThP3a7Y5vDb-lMJ1S9GY6ifdHEYy6lW9EKBvFK-W_6JG5BDeQWO0JIUQRzaqkkGLDBhn-WsKRhGWkIoAliOI4Cy18W_oQKnj1U_9p9cCac5W4xdlOW0ycyer5hBbw",
    stock: 50,
    tag: "Dual Core",
    specs: {
      Microcontroller: "ESP-WROOM-32",
      "Operating Voltage": "3.3V",
      Processor: "Tensilica Xtensa Dual-Core 32-bit LX6",
      SRAM: "520 KB",
      Connectivity: "WiFi 802.11 b/g/n, Bluetooth v4.2 BR/EDR & BLE",
      GPIO: "36 pins with multi-function mappings",
    },
  },
  {
    id: "sg90-servo",
    name: "SG90 Micro Servo Motor",
    categoryId: "motors",
    price: 4000,
    description:
      "A light, high-quality micro servo motor capable of rotating 180 degrees. Widely used in RC airplanes, robotic arms, obstacle-avoiding cars, and lock mechanisms.",
    rating: 4.4,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHfL4D_eNBkflb4LYMWKOkjAaTb_ztyOKpIRSYq_cjy3vB1Wzsa4wXUcPfh4FuZutGQlFRO6cy6MbidaVFryC040Gcnc3fpO66o6AFjGZg6LncUYfoqtYw3xN5FmzziVwu-CDSRHw0qx8tJI8OUzJyWauSkzza0okp58VibsQsKBY-AIUkKDAIiDGPF0D2acMOkqBDhvasrMHU9FLysgisjwFz66lVsz3ee1cWA9pHbvHBDci5aOMnGBykY5ZkwLmLoU7YDcXi1dc",
    stock: 150,
    tag: "Bargain",
    specs: {
      "Operating Speed": "0.12sec/60 degrees (4.8V no load)",
      "Stall Torque": "1.2kg/cm (4.8V)",
      "Operating Voltage": "3.0 - 7.2V",
      "Temperature Range": "-30C to +60C",
      "Dead Band Width": "7 microseconds",
      Weight: "9g",
    },
  },
  {
    id: "robot-car-kit",
    name: "Smart Robot Car Chassis Kit",
    categoryId: "kits",
    price: 35000,
    description:
      "A complete mechanical chassis system with 4 DC gear motors, rubber wheels, speed encoders, battery boxes, and structural accessories. Add a controller board and sensor to build autonomous vehicles.",
    rating: 4.6,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtLbjdsNAZdxUlYrOVoU9NXptSTpIZBGvWqK8SNkq0YO7CzkK4yCO_KKUunK3DLlV1EJZeNofudlJM7-ugtGBWfUjOKP64ZEXznlqTQkhSarcSiP3F5EtW-XSWP7aFkKbApiEeor4U6_YyWfI-36ZNVI_NNFC-8ijkZIFY2ggy6ijDtPhUI50FKGFxVe4Q6U9B60nldLJh1YlmwDkaCAaKhSa8EI3aBsekPZ7Fne-3nxXQH-qveYRq0EfmhC1jqaRhZSjTdUvTzoI",
    stock: 18,
    tag: "Robotics",
    specs: {
      "Motor Supply Voltage": "3V - 6V",
      "Reduction Ratio": "1:48",
      "Wheel Diameter": "65mm",
      "Wheel Width": "26mm",
      "Chassis Material": "Acrylic board",
      Motors: "4 x DC motor with gearboxes",
    },
  },
  {
    id: "dht11-sensor",
    name: "DHT11 Temperature Humidity Sensor",
    categoryId: "sensors",
    price: 3000,
    description:
      "A basic, low-cost digital temperature and humidity sensor. Uses a capacitive humidity sensor and a thermistor to measure the surrounding air, providing digital data output.",
    rating: 4.3,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHfL4D_eNBkflb4LYMWKOkjAaTb_ztyOKpIRSYq_cjy3vB1Wzsa4wXUcPfh4FuZutGQlFRO6cy6MbidaVFryC040Gcnc3fpO66o6AFjGZg6LncUYfoqtYw3xN5FmzziVwu-CDSRHw0qx8tJI8OUzJyWauSkzza0okp58VibsQsKBY-AIUkKDAIiDGPF0D2acMOkqBDhvasrMHU9FLysgisjwFz66lVsz3ee1cWA9pHbvHBDci5aOMnGBykY5ZkwLmLoU7YDcXi1dc",
    stock: 200,
    tag: null,
    specs: {
      "Operating Voltage": "3.3V - 5V DC",
      "Humidity Measurement Range": "20% - 90% RH",
      "Humidity Error": "+/- 5% RH",
      "Temperature Measurement Range": "0 - 50C",
      "Temperature Error": "+/- 2C",
      "Sampling Interval": "2 seconds",
    },
  },
  {
    id: "jumper-wires",
    name: "Male-to-Female Jumper Wires (40pcs)",
    categoryId: "accessories",
    price: 3500,
    description:
      "High-quality multicolored ribbon of 40 individual male-to-female jumper wires. Easily separable, standard 2.54mm pitch connectors ideal for breadboards and microcontrollers.",
    rating: 4.8,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtLbjdsNAZdxUlYrOVoU9NXptSTpIZBGvWqK8SNkq0YO7CzkK4yCO_KKUunK3DLlV1EJZeNofudlJM7-ugtGBWfUjOKP64ZEXznlqTQkhSarcSiP3F5EtW-XSWP7aFkKbApiEeor4U6_YyWfI-36ZNVI_NNFC-8ijkZIFY2ggy6ijDtPhUI50FKGFxVe4Q6U9B60nldLJh1YlmwDkaCAaKhSa8EI3aBsekPZ7Fne-3nxXQH-qveYRq0EfmhC1jqaRhZSjTdUvTzoI",
    stock: 300,
    tag: null,
    specs: {
      "Wire Count": "40 wires",
      Length: "20cm",
      "Connector Type": "Male to Female",
      Pitch: '2.54mm (0.1")',
    },
  },
];

async function main() {
  console.log("Seeding categories…");
  for (const c of CATEGORIES) {
    await prisma.category.upsert({ where: { id: c.id }, update: c, create: c });
  }

  console.log("Seeding products…");
  for (const p of PRODUCTS) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: { ...p, slug: p.id },
      create: { ...p, slug: p.id },
    });
  }

  const email = process.env.ADMIN_EMAIL ?? "admin@benax.local";
  const password = process.env.ADMIN_PASSWORD ?? "change-me-on-seed";
  const name = process.env.ADMIN_NAME ?? "BENAX Admin";
  const passwordHash = await bcrypt.hash(password, 10);

  console.log(`Seeding admin user: ${email}`);
  await prisma.user.upsert({
    where: { email },
    update: { name, role: Role.ADMIN, passwordHash },
    create: { email, name, role: Role.ADMIN, passwordHash },
  });

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
