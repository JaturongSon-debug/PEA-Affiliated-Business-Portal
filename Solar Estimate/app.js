/**
 * PEA SOLAR ESTIMATE - Interactive Calculation Engine
 * Provincial Electricity Authority (PEA) Affiliated Business Portal
 */

// ==========================================
// 1. DATASETS & PRICING MATRICES
// ==========================================

// Reference: คำนวณการ ติดตั้ง solar cell.png (PEA SOLAR ปรับราคาใหม่ 24 มี.ค. 2569)
const PEA_SOLAR_PACKAGES = [
    {
        id: "pea-3kw-1p",
        capacity: 3,
        phase: "1P",
        phaseLabel: "1 เฟส (220V)",
        area: 18,
        annualGeneration: 3510,
        monthlySavings: 1500,
        appliances: [
            { icon: "fa-lightbulb", text: "หลอดไฟ 18W x 15 ดวง" },
            { icon: "fa-tv", text: "TV LED 55 นิ้ว x 1 เครื่อง" },
            { icon: "fa-snowflake", text: "ตู้เย็น 15 คิว x 1 ตู้" },
            { icon: "fa-fan", text: "แอร์ 12,000 BTU x 1 เครื่อง" }
        ],
        pricing: {
            stringInverter: null,
            microOrOptimizer: {
                price: 118500,
                inverterBrand: "Deye",
                inverterType: "Micro Inverter",
                panelBrand: "JA SOLAR",
                label: "เริ่มต้น 118,500.- (Deye + JA SOLAR)"
            }
        }
    },
    {
        id: "pea-5kw-1p",
        capacity: 5,
        phase: "1P",
        phaseLabel: "1 เฟส (220V)",
        area: 30,
        annualGeneration: 5840,
        monthlySavings: 2500,
        appliances: [
            { icon: "fa-lightbulb", text: "หลอดไฟ 18W x 20 ดวง" },
            { icon: "fa-tv", text: "TV LED 55 นิ้ว x 4 เครื่อง" },
            { icon: "fa-snowflake", text: "ตู้เย็น 15 คิว x 1 ตู้" },
            { icon: "fa-fan", text: "แอร์ 12,000 BTU x 2 เครื่อง" }
        ],
        pricing: {
            stringInverter: {
                price: 139000,
                inverterBrand: "Deye",
                inverterType: "String Inverter",
                panelBrand: "JinkoSolar",
                label: "เริ่มต้น 139,000.- (Deye + JinkoSolar)"
            },
            microOrOptimizer: {
                price: 160500,
                inverterBrand: "HUAWEI",
                inverterType: "Power Optimizer",
                panelBrand: "JinkoSolar",
                label: "เริ่มต้น 160,500.- (HUAWEI + JinkoSolar)"
            }
        }
    },
    {
        id: "pea-5kw-3p",
        capacity: 5,
        phase: "3P",
        phaseLabel: "3 เฟส (380V)",
        area: 30,
        annualGeneration: 5840,
        monthlySavings: 2500,
        appliances: [
            { icon: "fa-lightbulb", text: "หลอดไฟ 18W x 20 ดวง" },
            { icon: "fa-tv", text: "TV LED 55 นิ้ว x 4 เครื่อง" },
            { icon: "fa-snowflake", text: "ตู้เย็น 15 คิว x 1 ตู้" },
            { icon: "fa-fan", text: "แอร์ 12,000 BTU x 2 เครื่อง" }
        ],
        pricing: {
            stringInverter: {
                price: 163900,
                inverterBrand: "HUAWEI",
                inverterType: "String Inverter",
                panelBrand: "JinkoSolar",
                label: "เริ่มต้น 163,900.- (HUAWEI + JinkoSolar)"
            },
            microOrOptimizer: {
                price: 155000,
                inverterBrand: "hoymiles",
                inverterType: "Micro Inverter",
                panelBrand: "JinkoSolar",
                label: "เริ่มต้น 155,000.- (hoymiles + JinkoSolar)"
            }
        }
    },
    {
        id: "pea-10kw-3p",
        capacity: 10,
        phase: "3P",
        phaseLabel: "3 เฟส (380V)",
        area: 60,
        annualGeneration: 11680,
        monthlySavings: 5000,
        appliances: [
            { icon: "fa-lightbulb", text: "หลอดไฟ 18W x 25 ดวง" },
            { icon: "fa-tv", text: "TV LED 55 นิ้ว x 8 เครื่อง" },
            { icon: "fa-snowflake", text: "ตู้เย็น 15 คิว x 3 ตู้" },
            { icon: "fa-fan", text: "แอร์ 12,000 BTU x 3 เครื่อง" }
        ],
        pricing: {
            stringInverter: {
                price: 214400,
                inverterBrand: "Deye",
                inverterType: "String Inverter",
                panelBrand: "JinkoSolar",
                label: "เริ่มต้น 214,400.- (Deye + JinkoSolar)"
            },
            microOrOptimizer: {
                price: 239200,
                inverterBrand: "hoymiles",
                inverterType: "Micro Inverter",
                panelBrand: "JinkoSolar",
                label: "เริ่มต้น 239,200.- (hoymiles + JinkoSolar)"
            }
        }
    },
    {
        id: "pea-15kw-3p",
        capacity: 15,
        phase: "3P",
        phaseLabel: "3 เฟส (380V)",
        area: 90,
        annualGeneration: 17520,
        monthlySavings: 7500,
        appliances: [
            { icon: "fa-lightbulb", text: "หลอดไฟ 18W x 35 ดวง" },
            { icon: "fa-tv", text: "TV LED 55 นิ้ว x 10 เครื่อง" },
            { icon: "fa-snowflake", text: "ตู้เย็น 15 คิว x 5 ตู้" },
            { icon: "fa-fan", text: "แอร์ 12,000 BTU x 5 เครื่อง" }
        ],
        pricing: {
            stringInverter: {
                price: 316500,
                inverterBrand: "HUAWEI",
                inverterType: "String Inverter",
                panelBrand: "JinkoSolar",
                label: "เริ่มต้น 316,500.- (HUAWEI + JinkoSolar)"
            },
            microOrOptimizer: {
                price: 319400,
                inverterBrand: "hoymiles",
                inverterType: "Micro Inverter",
                panelBrand: "JinkoSolar",
                label: "เริ่มต้น 319,400.- (hoymiles + JinkoSolar)"
            }
        }
    },
    {
        id: "pea-20kw-3p",
        capacity: 20,
        phase: "3P",
        phaseLabel: "3 เฟส (380V)",
        area: 120,
        annualGeneration: 23360,
        monthlySavings: 10000,
        appliances: [
            { icon: "fa-lightbulb", text: "หลอดไฟ 18W x 40 ดวง" },
            { icon: "fa-tv", text: "TV LED 55 นิ้ว x 18 เครื่อง" },
            { icon: "fa-snowflake", text: "ตู้เย็น 15 คิว x 6 ตู้" },
            { icon: "fa-fan", text: "แอร์ 12,000 BTU x 7 เครื่อง" }
        ],
        pricing: {
            stringInverter: {
                price: 388200,
                inverterBrand: "HUAWEI",
                inverterType: "String Inverter",
                panelBrand: "JinkoSolar",
                label: "เริ่มต้น 388,200.- (HUAWEI + JinkoSolar)"
            },
            microOrOptimizer: {
                price: 408400,
                inverterBrand: "hoymiles",
                inverterType: "Micro Inverter",
                panelBrand: "JinkoSolar",
                label: "เริ่มต้น 408,400.- (hoymiles + JinkoSolar)"
            }
        }
    }
];

// Reference: S__211345411.jpg (PEA x HUAWEI SOLAR SOLUTION สำหรับบ้านพักอาศัย ราคารวม VAT 7% แล้ว)
const HUAWEI_SOLAR_PACKAGES = [
    // หมวด 1: ขั้นเริ่มต้น (On-Grid)
    {
        id: "hw-ongrid-5kw-1p",
        hwType: "ongrid",
        typeTitle: "ขั้นเริ่มต้น (On-Grid)",
        capacity: 5,
        phase: "1P",
        phaseLabel: "1 เฟส (220V)",
        panelsCount: 8,
        panelModel: "LONGi Tier 1 650W",
        inverterModel: "SUN2000-5KTL-LBO",
        optimizerSpecs: null,
        batterySpecs: null,
        price: 156729,
        annualGeneration: 5840,
        estimatedSavings: 2500
    },
    {
        id: "hw-ongrid-10kw-1p",
        hwType: "ongrid",
        typeTitle: "ขั้นเริ่มต้น (On-Grid)",
        capacity: 10,
        phase: "1P",
        phaseLabel: "1 เฟส (220V)",
        panelsCount: 16,
        panelModel: "LONGi Tier 1 650W",
        inverterModel: "SUN2000-10KTL-LCO",
        optimizerSpecs: null,
        batterySpecs: null,
        price: 284386,
        annualGeneration: 11680,
        estimatedSavings: 5000
    },
    {
        id: "hw-ongrid-5kw-3p",
        hwType: "ongrid",
        typeTitle: "ขั้นเริ่มต้น (On-Grid)",
        capacity: 5,
        phase: "3P",
        phaseLabel: "3 เฟส (380V)",
        panelsCount: 8,
        panelModel: "LONGi Tier 1 650W",
        inverterModel: "SUN2000-5K-MAP0",
        optimizerSpecs: null,
        batterySpecs: null,
        price: 175688,
        annualGeneration: 5840,
        estimatedSavings: 2500
    },
    {
        id: "hw-ongrid-10kw-3p",
        hwType: "ongrid",
        typeTitle: "ขั้นเริ่มต้น (On-Grid)",
        capacity: 10,
        phase: "3P",
        phaseLabel: "3 เฟส (380V)",
        panelsCount: 16,
        panelModel: "LONGi Tier 1 650W",
        inverterModel: "SUN2000-10K-MAP0",
        optimizerSpecs: null,
        batterySpecs: null,
        price: 302082,
        annualGeneration: 11680,
        estimatedSavings: 5000
    },
    {
        id: "hw-ongrid-15kw-3p",
        hwType: "ongrid",
        typeTitle: "ขั้นเริ่มต้น (On-Grid)",
        capacity: 15,
        phase: "3P",
        phaseLabel: "3 เฟส (380V)",
        panelsCount: 24,
        panelModel: "LONGi Tier 1 650W",
        inverterModel: "SUN2000-15KTL-MB0",
        optimizerSpecs: null,
        batterySpecs: null,
        price: 415836,
        annualGeneration: 17520,
        estimatedSavings: 7500
    },
    {
        id: "hw-ongrid-20kw-3p",
        hwType: "ongrid",
        typeTitle: "ขั้นเริ่มต้น (On-Grid)",
        capacity: 20,
        phase: "3P",
        phaseLabel: "3 เฟส (380V)",
        panelsCount: 32,
        panelModel: "LONGi Tier 1 650W",
        inverterModel: "SUN2000-20KTL-MB0",
        optimizerSpecs: null,
        batterySpecs: null,
        price: 504312,
        annualGeneration: 23360,
        estimatedSavings: 10000
    },

    // หมวด 2: ติดตั้ง Optimizer (On-Grid)
    {
        id: "hw-opt-5kw-1p",
        hwType: "optimizer",
        typeTitle: "ติดตั้ง Optimizer (On-Grid)",
        capacity: 5,
        phase: "1P",
        phaseLabel: "1 เฟส (220V)",
        panelsCount: 8,
        panelModel: "LONGi Tier 1 650W",
        inverterModel: "SUN2000-5KTL-LBO",
        optimizerSpecs: "Optimizer 600W 8 ชุด",
        batterySpecs: null,
        price: 179985,
        annualGeneration: 6100,
        estimatedSavings: 2650
    },
    {
        id: "hw-opt-10kw-1p",
        hwType: "optimizer",
        typeTitle: "ติดตั้ง Optimizer (On-Grid)",
        capacity: 10,
        phase: "1P",
        phaseLabel: "1 เฟส (220V)",
        panelsCount: 16,
        panelModel: "LONGi Tier 1 650W",
        inverterModel: "SUN2000-10KTL-LCO",
        optimizerSpecs: "Optimizer 600W 16 ชุด",
        batterySpecs: null,
        price: 330899,
        annualGeneration: 12200,
        estimatedSavings: 5300
    },
    {
        id: "hw-opt-5kw-3p",
        hwType: "optimizer",
        typeTitle: "ติดตั้ง Optimizer (On-Grid)",
        capacity: 5,
        phase: "3P",
        phaseLabel: "3 เฟส (380V)",
        panelsCount: 8,
        panelModel: "LONGi Tier 1 650W",
        inverterModel: "SUN2000-5K-MAP0",
        optimizerSpecs: "Optimizer 600W 8 ชุด",
        batterySpecs: null,
        price: 198944,
        annualGeneration: 6100,
        estimatedSavings: 2650
    },
    {
        id: "hw-opt-10kw-3p",
        hwType: "optimizer",
        typeTitle: "ติดตั้ง Optimizer (On-Grid)",
        capacity: 10,
        phase: "3P",
        phaseLabel: "3 เฟส (380V)",
        panelsCount: 16,
        panelModel: "LONGi Tier 1 650W",
        inverterModel: "SUN2000-10K-MAP0",
        optimizerSpecs: "Optimizer 600W 16 ชุด",
        batterySpecs: null,
        price: 348594,
        annualGeneration: 12200,
        estimatedSavings: 5300
    },
    {
        id: "hw-opt-15kw-3p",
        hwType: "optimizer",
        typeTitle: "ติดตั้ง Optimizer (On-Grid)",
        capacity: 15,
        phase: "3P",
        phaseLabel: "3 เฟส (380V)",
        panelsCount: 24,
        panelModel: "LONGi Tier 1 650W",
        inverterModel: "SUN2000-15KTL-MB0",
        optimizerSpecs: "Optimizer 1300W 12 ชุด",
        batterySpecs: null,
        price: 457546,
        annualGeneration: 18300,
        estimatedSavings: 7900
    },
    {
        id: "hw-opt-20kw-3p",
        hwType: "optimizer",
        typeTitle: "ติดตั้ง Optimizer (On-Grid)",
        capacity: 20,
        phase: "3P",
        phaseLabel: "3 เฟส (380V)",
        panelsCount: 32,
        panelModel: "LONGi Tier 1 650W",
        inverterModel: "SUN2000-20KTL-MB0",
        optimizerSpecs: "Optimizer 1300W 16 ชุด",
        batterySpecs: null,
        price: 559925,
        annualGeneration: 24400,
        estimatedSavings: 10600
    },

    // หมวด 3: ติดตั้ง Battery 7 kWh (HYBRID)
    {
        id: "hw-hybrid-5kw-1p",
        hwType: "hybrid",
        typeTitle: "ติดตั้ง Battery 7 kWh (Hybrid)",
        capacity: 5,
        phase: "1P",
        phaseLabel: "1 เฟส (220V)",
        panelsCount: 8,
        panelModel: "LONGi Tier 1 650W",
        inverterModel: "SUN2000-5KTL-LBO",
        optimizerSpecs: null,
        batterySpecs: "Battery LUNA2000 7 kWh + อุปกรณ์ครบชุด",
        price: 374632,
        annualGeneration: 5840,
        estimatedSavings: 3800 // ประหยัดค่าไฟกลางคืนเพิ่มเติมด้วยแบตเตอรี่
    },
    {
        id: "hw-hybrid-10kw-1p",
        hwType: "hybrid",
        typeTitle: "ติดตั้ง Battery 7 kWh (Hybrid)",
        capacity: 10,
        phase: "1P",
        phaseLabel: "1 เฟส (220V)",
        panelsCount: 16,
        panelModel: "LONGi Tier 1 650W",
        inverterModel: "SUN2000-10KTL-LCO",
        optimizerSpecs: null,
        batterySpecs: "Battery LUNA2000 7 kWh + อุปกรณ์ครบชุด",
        price: 525546,
        annualGeneration: 11680,
        estimatedSavings: 6500
    },
    {
        id: "hw-hybrid-5kw-3p",
        hwType: "hybrid",
        typeTitle: "ติดตั้ง Battery 7 kWh (Hybrid)",
        capacity: 5,
        phase: "3P",
        phaseLabel: "3 เฟส (380V)",
        panelsCount: 8,
        panelModel: "LONGi Tier 1 650W",
        inverterModel: "SUN2000-5K-MAP0",
        optimizerSpecs: null,
        batterySpecs: "Battery LUNA2000 7 kWh + อุปกรณ์ครบชุด",
        price: 393591,
        annualGeneration: 5840,
        estimatedSavings: 3800
    },
    {
        id: "hw-hybrid-10kw-3p",
        hwType: "hybrid",
        typeTitle: "ติดตั้ง Battery 7 kWh (Hybrid)",
        capacity: 10,
        phase: "3P",
        phaseLabel: "3 เฟส (380V)",
        panelsCount: 16,
        panelModel: "LONGi Tier 1 650W",
        inverterModel: "SUN2000-10K-MAP0",
        optimizerSpecs: null,
        batterySpecs: "Battery LUNA2000 7 kWh + อุปกรณ์ครบชุด",
        price: 543241,
        annualGeneration: 11680,
        estimatedSavings: 6500
    },
    {
        id: "hw-hybrid-15kw-3p",
        hwType: "hybrid",
        typeTitle: "ติดตั้ง Battery 7 kWh (Hybrid)",
        capacity: 15,
        phase: "3P",
        phaseLabel: "3 เฟส (380V)",
        panelsCount: 24,
        panelModel: "LONGi Tier 1 650W",
        inverterModel: "SUN2000-15KTL-MB0",
        optimizerSpecs: null,
        batterySpecs: "Battery LUNA2000 7 kWh + อุปกรณ์ครบชุด",
        price: 652192,
        annualGeneration: 17520,
        estimatedSavings: 9200
    },
    {
        id: "hw-hybrid-20kw-3p",
        hwType: "hybrid",
        typeTitle: "ติดตั้ง Battery 7 kWh (Hybrid)",
        capacity: 20,
        phase: "3P",
        phaseLabel: "3 เฟส (380V)",
        panelsCount: 32,
        panelModel: "LONGi Tier 1 650W",
        inverterModel: "SUN2000-20KTL-MB0",
        optimizerSpecs: null,
        batterySpecs: "Battery LUNA2000 7 kWh + อุปกรณ์ครบชุด",
        price: 754571,
        annualGeneration: 23360,
        estimatedSavings: 11800
    }
];

// Reference: ค่าบริการบำรุงรักษา Solar rooftop.jpg (SOLAR Green Power By PEA)
const MAINTENANCE_RATES = {
    3: 4890,
    5: 5750,
    10: 7910,
    15: 10070,
    20: 12230,
    50: 25170,
    100: 46750
};

// 10 รายการตรวจเช็กมาตรฐาน กฟภ.
const MAINTENANCE_10_CHECKS = [
    {
        title: "ตรวจสอบสภาพทางกายภาพของแผงโซล่าเซลล์",
        desc: "ตรวจหารอยแตกร้าว การเปลี่ยนสี รอยไหม้ (Delamination) และคราบฝังแน่นที่บดบังเซลล์แสงอาทิตย์"
    },
    {
        title: "ตรวจวัดค่าแรงดันและกระแสไฟฟ้า DC (Voc, Isc, Vmp)",
        desc: "วัดประสิทธิภาพการผลิตไฟฟ้าของแต่ละ String เทียบกับค่าพิกัดมาตรฐานจากโรงงานผู้ผลิต"
    },
    {
        title: "ตรวจสอบและทดสอบระบบการทำงานของ Inverter",
        desc: "ตรวจเช็กหน้าจอแสดงผล ประวัติรหัสข้อผิดพลาด (Alarm / Fault Log) อุณหภูมิ และระบบระบายความร้อน"
    },
    {
        title: "ตรวจสอบและขันกวดขั้วต่อสายไฟ MC4 และจุดต่อไฟฟ้า",
        desc: "ขันกวดขั้วต่อแรงบิดตามสเปก ป้องกันการหลวมคลอน อาร์ก (Arc Fault) และลดความเสี่ยงเพลิงไหม้"
    },
    {
        title: "ตรวจสอบตู้ควบคุมไฟฟ้ากระแสตรงและสลับ (DC/AC Combiner)",
        desc: "ตรวจสภาพเซอร์กิตเบรกเกอร์ ฟิวส์ สวิตช์ตัดตอน ฉนวนหุ้ม และซีลกันน้ำกันฝุ่น IP65"
    },
    {
        title: "ตรวจสอบระบบป้องกันเสิร์จและฟ้าผ่า (Surge Protective Devices)",
        desc: "ตรวจเช็กสถานะตัวกันกระชากทั้งฝั่ง DC และ AC เพื่อความปลอดภัยต่ออุปกรณ์อิเล็กทรอนิกส์"
    },
    {
        title: "ตรวจวัดค่าความต้านทานระบบสายดิน (Grounding Resistance Test)",
        desc: "วัดค่าความต้านทานดินให้มีค่าไม่เกิน 5 โอห์ม ตามมาตรฐานความปลอดภัยสูงสุดของการไฟฟ้าฯ"
    },
    {
        title: "ตรวจวัดค่าความต้านทานความเป็นฉนวน (Insulation Resistance Test)",
        desc: "ทดสอบการรั่วไหลของกระแสไฟฟ้าระหว่างตัวนำกับดิน (Megger Test) ป้องกันไฟรั่วและไฟฟ้าดูด"
    },
    {
        title: "ตรวจสอบความร้อนผิดปกติด้วยกล้องถ่ายภาพความร้อน (Thermal Imaging)",
        desc: "ตรวจจับจุด Hotspot บนแผงเซลล์แสงอาทิตย์ ขั้วต่อ และเบรกเกอร์ เพื่อแก้ไขก่อนเกิดความเสียหาย"
    },
    {
        title: "ตรวจสอบโครงสร้างรองรับแผง (Mounting) และหลังคา",
        desc: "ตรวจเช็กความแข็งแรงของรางยึด น็อตสแตนเลส Clamps และจุดยาแนวกันน้ำรั่วซึมบนหลังคา"
    }
];

// ==========================================
// 2. STATE MANAGEMENT
// ==========================================
const appState = {
    currentTab: "tab-installation",
    packageSource: "pea-standard", // "pea-standard" or "huawei-solution"
    phaseFilter: "all",           // "all", "1P", "3P"
    hwTypeFilter: "all",          // "all", "ongrid", "optimizer", "hybrid"
    selectedPackage: null,
    maintenance: {
        selectedCapacity: 5,
        frequency: 1, // times per year
        baseRate: 5750,
        annualCost: 5750
    },
    roi: {
        capacity: 5,
        cost: 160500,
        currentMonthlyBill: 4500,
        tariffRate: 4.40,
        daytimeRatio: 0.70,
        includeMaint: true,
        annualMaintCost: 5750,
        electricityInflation: 0.025,
        degradationRate: 0.0055,
        chartInstance: null
    }
};

// Format Currency
function formatMoney(num) {
    if (isNaN(num) || num === null || num === undefined) return "0";
    return Number(num).toLocaleString("th-TH", { maximumFractionDigits: 0 });
}

// ==========================================
// 3. UI RENDERING & EVENT LISTENERS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initTabs();
    initInstallationModule();
    initMaintenanceModule();
    initRoiModule();
});

// Theme Initialization & Switcher
function initTheme() {
    const themeBtn = document.getElementById("themeToggleBtn");
    const savedTheme = localStorage.getItem("pea_solar_theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);

    themeBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("pea_solar_theme", newTheme);

        // Update chart if initialized
        if (appState.roi.chartInstance) {
            updateChartTheme(newTheme);
        }
    });
}

// Navigation Tabs
function initTabs() {
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetTab = btn.getAttribute("data-tab");
            switchTab(targetTab);
        });
    });

    // Dock action: Go to ROI tab
    const dockGotoRoiBtn = document.getElementById("dockGotoRoiBtn");
    if (dockGotoRoiBtn) {
        dockGotoRoiBtn.addEventListener("click", () => {
            switchTab("tab-roi");
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Maintenance action: Send to ROI tab
    const sendMaintToRoiBtn = document.getElementById("sendMaintToRoiBtn");
    if (sendMaintToRoiBtn) {
        sendMaintToRoiBtn.addEventListener("click", () => {
            syncMaintenanceToRoi();
            switchTab("tab-roi");
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
}

function switchTab(tabId) {
    appState.currentTab = tabId;

    document.querySelectorAll(".tab-button").forEach(b => {
        b.classList.toggle("active", b.getAttribute("data-tab") === tabId);
    });

    document.querySelectorAll(".tab-content").forEach(content => {
        content.classList.toggle("active", content.id === tabId);
    });

    // Re-render chart on tab activation to guarantee correct canvas dimensions
    if (tabId === "tab-roi" && appState.roi.chartInstance) {
        setTimeout(() => {
            appState.roi.chartInstance.resize();
        }, 50);
    }
}

// ==========================================
// 4. MODULE 1: INSTALLATION ESTIMATOR
// ==========================================

function initInstallationModule() {
    // Sub-tab switcher: PEA Standard vs Huawei
    const subTabButtons = document.querySelectorAll(".sub-tab-btn");
    const huaweiTypeFilterGroup = document.getElementById("huaweiTypeFilterGroup");

    subTabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            subTabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            appState.packageSource = btn.getAttribute("data-source");

            if (appState.packageSource === "huawei-solution") {
                huaweiTypeFilterGroup.style.display = "flex";
            } else {
                huaweiTypeFilterGroup.style.display = "none";
            }

            renderPackagesGrid();
        });
    });

    // Phase filters
    const phaseButtons = document.querySelectorAll("#phaseFilterGroup .pill-btn");
    phaseButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            phaseButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            appState.phaseFilter = btn.getAttribute("data-phase");
            renderPackagesGrid();
        });
    });

    // Huawei type filters
    const hwTypeButtons = document.querySelectorAll("#huaweiTypeFilterGroup .pill-btn");
    hwTypeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            hwTypeButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            appState.hwTypeFilter = btn.getAttribute("data-hwtype");
            renderPackagesGrid();
        });
    });

    // Populate ROI Package Select Dropdown
    populateRoiPackageDropdown();

    // Initial render
    renderPackagesGrid();
}

function renderPackagesGrid() {
    const grid = document.getElementById("packagesGrid");
    grid.innerHTML = "";

    if (appState.packageSource === "pea-standard") {
        renderPeaStandardPackages(grid);
    } else {
        renderHuaweiSolutionPackages(grid);
    }
}

function renderPeaStandardPackages(container) {
    let filtered = PEA_SOLAR_PACKAGES;

    if (appState.phaseFilter !== "all") {
        filtered = filtered.filter(p => p.phase === appState.phaseFilter);
    }

    if (filtered.length === 0) {
        container.innerHTML = `<div class="no-results-msg"><i class="fa-solid fa-circle-exclamation"></i> ไม่พบแพ็กเกจที่ตรงกับตัวกรอง</div>`;
        return;
    }

    filtered.forEach(pkg => {
        const isSelected = appState.selectedPackage && appState.selectedPackage.id === pkg.id;
        const card = document.createElement("div");
        card.className = `package-card ${isSelected ? "selected" : ""}`;

        // Build price rows
        let priceRowsHtml = "";
        if (pkg.pricing.stringInverter) {
            priceRowsHtml += `
                <div class="price-option-row">
                    <div class="price-option-title">
                        String Inverter (${pkg.pricing.stringInverter.inverterBrand})
                        <small>แผง ${pkg.pricing.stringInverter.panelBrand}</small>
                    </div>
                    <div class="price-option-val">${formatMoney(pkg.pricing.stringInverter.price)} <span style="font-size:0.75rem">บาท</span></div>
                </div>
            `;
        }
        if (pkg.pricing.microOrOptimizer) {
            priceRowsHtml += `
                <div class="price-option-row">
                    <div class="price-option-title">
                        ${pkg.pricing.microOrOptimizer.inverterType} (${pkg.pricing.microOrOptimizer.inverterBrand})
                        <small>แผง ${pkg.pricing.microOrOptimizer.panelBrand}</small>
                    </div>
                    <div class="price-option-val accent">${formatMoney(pkg.pricing.microOrOptimizer.price)} <span style="font-size:0.75rem">บาท</span></div>
                </div>
            `;
        }

        // Appliance items
        const appliancesHtml = pkg.appliances.map(app => `
            <li><i class="fa-solid ${app.icon}"></i> ${app.text}</li>
        `).join("");

        card.innerHTML = `
            <div>
                <div class="card-top-tag">
                    <span class="tag-phase">${pkg.phaseLabel}</span>
                    <span class="tag-highlight">ลดค่าไฟ ~${formatMoney(pkg.monthlySavings)} บ./ด.</span>
                </div>
                <div class="card-header-info">
                    <div class="card-capacity-title">${pkg.capacity} kW</div>
                    <div class="card-brand-model">พื้นที่ติดตั้งประมาณ ${pkg.area} ตร.ม. • ผลิตไฟ ${formatMoney(pkg.annualGeneration)} หน่วย/ปี</div>
                </div>

                <div class="card-price-container">
                    ${priceRowsHtml}
                </div>

                <ul class="card-specs-list">
                    ${appliancesHtml}
                </ul>
            </div>

            <div>
                <button class="card-select-btn" onclick="selectPeaPackage('${pkg.id}')">
                    <i class="fa-solid fa-circle-check"></i>
                    <span>${isSelected ? "เลือกแพ็กเกจนี้แล้ว" : "เลือกแพ็กเกจนี้"}</span>
                </button>
            </div>
        `;

        container.appendChild(card);
    });
}

function renderHuaweiSolutionPackages(container) {
    let filtered = HUAWEI_SOLAR_PACKAGES;

    if (appState.phaseFilter !== "all") {
        filtered = filtered.filter(p => p.phase === appState.phaseFilter);
    }

    if (appState.hwTypeFilter !== "all") {
        filtered = filtered.filter(p => p.hwType === appState.hwTypeFilter);
    }

    if (filtered.length === 0) {
        container.innerHTML = `<div class="no-results-msg"><i class="fa-solid fa-circle-exclamation"></i> ไม่พบแพ็กเกจที่ตรงกับตัวกรอง</div>`;
        return;
    }

    filtered.forEach(pkg => {
        const isSelected = appState.selectedPackage && appState.selectedPackage.id === pkg.id;
        const card = document.createElement("div");
        card.className = `package-card ${isSelected ? "selected" : ""}`;

        let techDetailsHtml = "";
        if (pkg.optimizerSpecs) {
            techDetailsHtml += `<li><i class="fa-solid fa-microchip"></i> ${pkg.optimizerSpecs}</li>`;
        }
        if (pkg.batterySpecs) {
            techDetailsHtml += `<li><i class="fa-solid fa-car-battery"></i> ${pkg.batterySpecs}</li>`;
        }

        card.innerHTML = `
            <div>
                <div class="card-top-tag">
                    <span class="tag-phase">${pkg.phaseLabel}</span>
                    <span class="tag-highlight">${pkg.typeTitle}</span>
                </div>
                <div class="card-header-info">
                    <div class="card-capacity-title">${pkg.capacity} kW</div>
                    <div class="card-brand-model">Inverter Huawei: ${pkg.inverterModel}</div>
                </div>

                <div class="card-price-container">
                    <div class="price-option-row">
                        <div class="price-option-title">
                            ราคาสุทธิรวม VAT 7%
                            <small>ประหยัดค่าไฟ ~${formatMoney(pkg.estimatedSavings)} บ./ด.</small>
                        </div>
                        <div class="price-option-val accent">${formatMoney(pkg.price)} <span style="font-size:0.75rem">บาท</span></div>
                    </div>
                </div>

                <ul class="card-specs-list">
                    <li><i class="fa-solid fa-solar-panel"></i> ${pkg.panelModel} (${pkg.panelsCount} แผง)</li>
                    ${techDetailsHtml}
                    <li><i class="fa-solid fa-shield-check"></i> รับประกัน Inverter 10 ปี / แผง 25 ปี</li>
                    <li><i class="fa-solid fa-soap"></i> บำรุงรักษาฟรี 2 ปี (ล้างแผง 1 ครั้ง/ปี)</li>
                </ul>
            </div>

            <div>
                <button class="card-select-btn" onclick="selectHuaweiPackage('${pkg.id}')">
                    <i class="fa-solid fa-circle-check"></i>
                    <span>${isSelected ? "เลือกแพ็กเกจนี้แล้ว" : "เลือกแพ็กเกจนี้"}</span>
                </button>
            </div>
        `;

        container.appendChild(card);
    });
}

// User selection handlers
window.selectPeaPackage = function(pkgId) {
    const pkg = PEA_SOLAR_PACKAGES.find(p => p.id === pkgId);
    if (!pkg) return;

    // Use micro/optimizer price as default, or string inverter
    const chosenPrice = pkg.pricing.microOrOptimizer ? pkg.pricing.microOrOptimizer.price : pkg.pricing.stringInverter.price;
    const chosenDesc = pkg.pricing.microOrOptimizer
        ? `${pkg.capacity} kW ${pkg.phaseLabel} (${pkg.pricing.microOrOptimizer.inverterBrand} + ${pkg.pricing.microOrOptimizer.panelBrand})`
        : `${pkg.capacity} kW ${pkg.phaseLabel} (${pkg.pricing.stringInverter.inverterBrand} + ${pkg.pricing.stringInverter.panelBrand})`;

    appState.selectedPackage = {
        id: pkg.id,
        name: `PEA Solar ${pkg.capacity} kW (${pkg.phaseLabel})`,
        capacity: pkg.capacity,
        price: chosenPrice,
        desc: chosenDesc,
        annualGeneration: pkg.annualGeneration
    };

    updateSelectedPackageDock();
    renderPackagesGrid();
    applyPackageToRoi(appState.selectedPackage);
};

window.selectHuaweiPackage = function(pkgId) {
    const pkg = HUAWEI_SOLAR_PACKAGES.find(p => p.id === pkgId);
    if (!pkg) return;

    appState.selectedPackage = {
        id: pkg.id,
        name: `HUAWEI Solar Solution ${pkg.capacity} kW (${pkg.typeTitle})`,
        capacity: pkg.capacity,
        price: pkg.price,
        desc: `${pkg.phaseLabel} • ${pkg.panelModel} (${pkg.panelsCount} แผง) • Inverter ${pkg.inverterModel}`,
        annualGeneration: pkg.annualGeneration
    };

    updateSelectedPackageDock();
    renderPackagesGrid();
    applyPackageToRoi(appState.selectedPackage);
};

function updateSelectedPackageDock() {
    const dock = document.getElementById("selectedPackageDock");
    const nameEl = document.getElementById("dockPackageName");
    const specsEl = document.getElementById("dockPackageSpecs");
    const priceEl = document.getElementById("dockPackagePrice");

    if (appState.selectedPackage) {
        nameEl.textContent = appState.selectedPackage.name;
        specsEl.textContent = appState.selectedPackage.desc;
        priceEl.textContent = `${formatMoney(appState.selectedPackage.price)} บาท`;
        dock.classList.add("visible");
        document.getElementById("installSummaryBadge").textContent = `${appState.selectedPackage.capacity} kW`;
    } else {
        dock.classList.remove("visible");
    }
}

function populateRoiPackageDropdown() {
    const peaOptGroup = document.getElementById("roiOptGroupPEA");
    const hwOptGroup = document.getElementById("roiOptGroupHuawei");

    if (!peaOptGroup || !hwOptGroup) return;

    peaOptGroup.innerHTML = "";
    hwOptGroup.innerHTML = "";

    PEA_SOLAR_PACKAGES.forEach(pkg => {
        const price = pkg.pricing.microOrOptimizer ? pkg.pricing.microOrOptimizer.price : pkg.pricing.stringInverter.price;
        const opt = document.createElement("option");
        opt.value = `pea:${pkg.id}`;
        opt.textContent = `PEA Solar ${pkg.capacity} kW (${pkg.phaseLabel}) - ${formatMoney(price)} บาท`;
        peaOptGroup.appendChild(opt);
    });

    HUAWEI_SOLAR_PACKAGES.forEach(pkg => {
        const opt = document.createElement("option");
        opt.value = `hw:${pkg.id}`;
        opt.textContent = `Huawei ${pkg.capacity} kW (${pkg.typeTitle} - ${pkg.phaseLabel}) - ${formatMoney(pkg.price)} บาท`;
        hwOptGroup.appendChild(opt);
    });
}

// ==========================================
// 5. MODULE 2: MAINTENANCE ESTIMATOR
// ==========================================

function initMaintenanceModule() {
    // Capacity Chips
    const capChips = document.querySelectorAll("#maintCapacityGrid .cap-chip");
    capChips.forEach(chip => {
        chip.addEventListener("click", () => {
            capChips.forEach(c => c.classList.remove("active"));
            chip.classList.add("active");
            const kw = parseInt(chip.getAttribute("data-kw"), 10);
            appState.maintenance.selectedCapacity = kw;
            calculateMaintenancePrice();
        });
    });

    // Frequency Radios
    const freqRadios = document.querySelectorAll("input[name='maintFreq']");
    freqRadios.forEach(radio => {
        radio.addEventListener("change", (e) => {
            document.querySelectorAll(".radio-card").forEach(c => c.classList.remove("active"));
            e.target.closest(".radio-card").classList.add("active");
            appState.maintenance.frequency = parseInt(e.target.value, 10);
            calculateMaintenancePrice();
        });
    });

    // Render 10 Standard Checklist Items
    renderChecklistItems();

    // Initial price calculation
    calculateMaintenancePrice();
}

function calculateMaintenancePrice() {
    const kw = appState.maintenance.selectedCapacity;
    const baseRate = MAINTENANCE_RATES[kw] || 5750;
    const freq = appState.maintenance.frequency;

    let total = baseRate * freq;
    // Offer 5% discount if choosing 2 times per year
    if (freq === 2) {
        total = Math.round(total * 0.95);
    }

    appState.maintenance.baseRate = baseRate;
    appState.maintenance.annualCost = total;

    document.getElementById("maintBaseRateText").textContent = `${formatMoney(baseRate)} บาท`;
    document.getElementById("maintFreqText").textContent = freq === 1 ? "1 ครั้ง / ปี" : "2 ครั้ง / ปี (ลด 5%)";
    document.getElementById("maintTotalPriceText").textContent = `${formatMoney(total)} บาท/ปี`;
    document.getElementById("maintSummaryBadge").textContent = `${kw} kW (${formatMoney(total)} บ./ปี)`;
}

function renderChecklistItems() {
    const container = document.getElementById("checklistItemsGrid");
    container.innerHTML = "";

    MAINTENANCE_10_CHECKS.forEach((item, idx) => {
        const itemEl = document.createElement("div");
        itemEl.className = "check-item";
        itemEl.innerHTML = `
            <div class="check-number">${idx + 1}</div>
            <div>
                <div class="check-title">${item.title}</div>
                <div class="check-desc">${item.desc}</div>
            </div>
        `;
        container.appendChild(itemEl);
    });
}

function syncMaintenanceToRoi() {
    const annualCost = appState.maintenance.annualCost;
    document.getElementById("roiIncludeMaintCheck").checked = true;
    document.getElementById("roiAnnualMaintInput").value = annualCost;
    appState.roi.includeMaint = true;
    appState.roi.annualMaintCost = annualCost;
    calculateRoi();
}

// ==========================================
// 6. MODULE 3: ROI & BREAK-EVEN CALCULATOR
// ==========================================

function initRoiModule() {
    const packageSelect = document.getElementById("roiPackageSelect");
    const capacityInput = document.getElementById("roiCapacityInput");
    const costInput = document.getElementById("roiCostInput");
    const currentBillInput = document.getElementById("roiCurrentBillInput");
    const tariffRateInput = document.getElementById("roiTariffRateInput");
    const daytimeSlider = document.getElementById("roiDaytimeRatioInput");
    const daytimeVal = document.getElementById("roiDaytimeRatioVal");
    const maintCheck = document.getElementById("roiIncludeMaintCheck");
    const annualMaintInput = document.getElementById("roiAnnualMaintInput");
    const inflationInput = document.getElementById("roiInflationInput");
    const degradationInput = document.getElementById("roiDegradationInput");
    const calcBtn = document.getElementById("roiCalculateBtn");
    const resetBtn = document.getElementById("roiResetDefaultsBtn");

    // Slider listener
    daytimeSlider.addEventListener("input", (e) => {
        daytimeVal.textContent = `${e.target.value}%`;
        calculateRoi();
    });

    // Checkbox maintenance listener
    maintCheck.addEventListener("change", (e) => {
        document.getElementById("roiMaintInputWrap").style.opacity = e.target.checked ? "1" : "0.4";
        annualMaintInput.disabled = !e.target.checked;
        calculateRoi();
    });

    // Dropdown change listener
    packageSelect.addEventListener("change", (e) => {
        const val = e.target.value;
        if (val === "custom") return;

        const [prefix, id] = val.split(":");
        if (prefix === "pea") {
            const pkg = PEA_SOLAR_PACKAGES.find(p => p.id === id);
            if (pkg) {
                const price = pkg.pricing.microOrOptimizer ? pkg.pricing.microOrOptimizer.price : pkg.pricing.stringInverter.price;
                applyPackageToRoi({
                    id: pkg.id,
                    name: `PEA Solar ${pkg.capacity} kW`,
                    capacity: pkg.capacity,
                    price: price
                });
            }
        } else if (prefix === "hw") {
            const pkg = HUAWEI_SOLAR_PACKAGES.find(p => p.id === id);
            if (pkg) {
                applyPackageToRoi({
                    id: pkg.id,
                    name: `Huawei ${pkg.capacity} kW`,
                    capacity: pkg.capacity,
                    price: pkg.price
                });
            }
        }
    });

    // Instant update on field edits
    [capacityInput, costInput, currentBillInput, tariffRateInput, annualMaintInput, inflationInput, degradationInput].forEach(inp => {
        inp.addEventListener("input", () => calculateRoi());
    });

    calcBtn.addEventListener("click", () => calculateRoi());

    // Reset button
    resetBtn.addEventListener("click", () => {
        capacityInput.value = 5;
        costInput.value = 160500;
        currentBillInput.value = 4500;
        tariffRateInput.value = 4.40;
        daytimeSlider.value = 70;
        daytimeVal.textContent = "70%";
        maintCheck.checked = true;
        annualMaintInput.disabled = false;
        document.getElementById("roiMaintInputWrap").style.opacity = "1";
        annualMaintInput.value = 5750;
        inflationInput.value = 2.5;
        degradationInput.value = 0.55;
        packageSelect.value = "custom";
        calculateRoi();
    });

    // Initial calculation
    calculateRoi();
}

function applyPackageToRoi(pkg) {
    const packageSelect = document.getElementById("roiPackageSelect");
    const capacityInput = document.getElementById("roiCapacityInput");
    const costInput = document.getElementById("roiCostInput");
    const annualMaintInput = document.getElementById("roiAnnualMaintInput");

    capacityInput.value = pkg.capacity;
    costInput.value = pkg.price;

    // Estimate maintenance cost according to nearest standard rate
    const maintRate = MAINTENANCE_RATES[pkg.capacity] || 5750;
    annualMaintInput.value = maintRate;

    // Match dropdown value if exists
    for (let i = 0; i < packageSelect.options.length; i++) {
        if (packageSelect.options[i].value.includes(pkg.id)) {
            packageSelect.selectedIndex = i;
            break;
        }
    }

    calculateRoi();
}

function calculateRoi() {
    // 1. Gather inputs
    const capacity = parseFloat(document.getElementById("roiCapacityInput").value) || 5;
    const initialInvestment = parseFloat(document.getElementById("roiCostInput").value) || 160500;
    const currentBill = parseFloat(document.getElementById("roiCurrentBillInput").value) || 4500;
    const tariffRate = parseFloat(document.getElementById("roiTariffRateInput").value) || 4.40;
    const daytimeRatio = (parseFloat(document.getElementById("roiDaytimeRatioInput").value) || 70) / 100;
    const includeMaint = document.getElementById("roiIncludeMaintCheck").checked;
    const annualMaint = includeMaint ? (parseFloat(document.getElementById("roiAnnualMaintInput").value) || 0) : 0;
    const inflation = (parseFloat(document.getElementById("roiInflationInput").value) || 2.5) / 100;
    const degradation = (parseFloat(document.getElementById("roiDegradationInput").value) || 0.55) / 100;

    // 2. Base year generation: standard 1 kW produces ~1,168 kWh/year in Thailand (average 3.2 - 4.5 peak sun hours)
    const baseYearlyGeneration = capacity * 1168;

    // 3. 25-Year Simulation Loop
    const years = 25;
    let cumulativeCashflow = -initialInvestment;
    let paybackYear = null;
    let paybackFraction = 0;
    let totalSavings25Years = 0;
    let firstYearSavings = 0;

    const yearlyData = [];
    const chartLabels = ["ปี 0 (ติดตั้ง)"];
    const chartCumulativeData = [-initialInvestment];
    const chartZeroLine = [0];

    for (let yr = 1; yr <= years; yr++) {
        // Generation after annual degradation
        const yearGeneration = baseYearlyGeneration * Math.pow(1 - degradation, yr - 1);

        // Effective electricity tariff escalated with inflation
        const currentTariff = tariffRate * Math.pow(1 + inflation, yr - 1);

        // Value of solar electricity consumed directly or exported
        // In residential rooftop, self-consumption is valued at retail tariff; surplus export rate (PEA solar citizen ~2.20 THB/kWh)
        // We model direct daytime savings + offset
        const daytimeDirectGen = yearGeneration * daytimeRatio;
        const surplusGen = yearGeneration * (1 - daytimeRatio);

        // Total monetary electricity savings
        const yearSavings = (daytimeDirectGen * currentTariff) + (surplusGen * 2.20);

        if (yr === 1) firstYearSavings = yearSavings;

        // Maintenance fee
        const yearMaint = annualMaint;

        // Net cash inflow for this year
        const netCashflow = yearSavings - yearMaint;

        const prevCumulative = cumulativeCashflow;
        cumulativeCashflow += netCashflow;
        totalSavings25Years += netCashflow;

        // Detect Break-Even point
        if (prevCumulative < 0 && cumulativeCashflow >= 0 && paybackYear === null) {
            paybackYear = yr;
            paybackFraction = Math.abs(prevCumulative) / netCashflow;
        }

        yearlyData.push({
            year: yr,
            generation: Math.round(yearGeneration),
            savings: Math.round(yearSavings),
            maintenance: Math.round(yearMaint),
            net: Math.round(netCashflow),
            cumulative: Math.round(cumulativeCashflow)
        });

        chartLabels.push(`ปีที่ ${yr}`);
        chartCumulativeData.push(Math.round(cumulativeCashflow));
        chartZeroLine.push(0);
    }

    // 4. Update UI KPIs
    let paybackText = "-";
    let paybackSub = "";
    if (paybackYear !== null) {
        const totalPaybackYears = (paybackYear - 1) + paybackFraction;
        const wholeYears = Math.floor(totalPaybackYears);
        const months = Math.round((totalPaybackYears - wholeYears) * 12);
        paybackText = `${wholeYears} ปี ${months} เดือน`;
        paybackSub = `จุดคุ้มทุนภายในปีที่ ${paybackYear}`;
    } else {
        paybackText = "> 25 ปี";
        paybackSub = "ระยะเวลาคืนทุนเกิน 25 ปี";
    }

    const netProfit25Years = totalSavings25Years;
    const roiPercent = initialInvestment > 0 ? Math.round((netProfit25Years / initialInvestment) * 100) : 0;

    // Environmental metrics (approx. 0.50 kg CO2 / kWh from Thai grid mix)
    const annualCo2Tons = ((baseYearlyGeneration * 0.50) / 1000).toFixed(2);
    const treesEquivalent = Math.round(baseYearlyGeneration * 0.50 / 10); // 1 mature tree absorbs ~10 kg CO2/yr

    // Banner KPIs
    document.getElementById("kpiPaybackText").textContent = paybackText;
    document.getElementById("kpiPaybackSubtext").textContent = paybackSub;
    document.getElementById("kpiYear1SavingsText").textContent = `${formatMoney(firstYearSavings)} บ./ปี`;
    document.getElementById("kpiMonth1SavingsText").textContent = `~${formatMoney(firstYearSavings / 12)} บ./เดือน`;
    document.getElementById("kpiNetSavingsText").textContent = `${formatMoney(netProfit25Years)} บ.`;
    document.getElementById("kpiRoiPercentText").textContent = `ROI ${roiPercent}%`;

    // Hero quick stats
    document.getElementById("quickPaybackKpi").textContent = paybackText;
    document.getElementById("quickRoiKpi").textContent = `${formatMoney(netProfit25Years)} บ.`;
    document.getElementById("quickCo2Kpi").textContent = `${annualCo2Tons} ตัน`;

    // Eco row
    document.getElementById("ecoCo2Val").textContent = annualCo2Tons;
    document.getElementById("ecoTreeVal").textContent = formatMoney(treesEquivalent);
    document.getElementById("ecoKwhVal").textContent = formatMoney(baseYearlyGeneration);

    // 5. Render 25-Year Data Table
    renderCashflowTable(yearlyData);

    // 6. Render Chart.js
    renderRoiChart(chartLabels, chartCumulativeData, chartZeroLine, initialInvestment);
}

function renderCashflowTable(data) {
    const tbody = document.getElementById("cashflowTableBody");
    tbody.innerHTML = "";

    data.forEach(row => {
        const isPositive = row.cumulative >= 0;
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${row.year}</strong></td>
            <td>${formatMoney(row.generation)}</td>
            <td>${formatMoney(row.savings)}</td>
            <td>${formatMoney(row.maintenance)}</td>
            <td style="color:${row.net >= 0 ? 'var(--accent-emerald-light)' : '#f87171'}">${formatMoney(row.net)}</td>
            <td style="font-weight:700; color:${isPositive ? 'var(--accent-gold)' : '#f87171'}">${formatMoney(row.cumulative)}</td>
            <td>
                <span class="status-badge-table ${isPositive ? 'positive' : 'negative'}">
                    ${isPositive ? 'กำไรแล้ว' : 'ยังไม่คืนทุน'}
                </span>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function renderRoiChart(labels, cumulativeData, zeroLine, initialInvestment) {
    const ctx = document.getElementById("roiCashflowChart");
    if (!ctx) return;

    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const gridColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)";
    const textColor = isDark ? "#94a3b8" : "#475569";

    if (appState.roi.chartInstance) {
        appState.roi.chartInstance.destroy();
    }

    appState.roi.chartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "กระแสเงินสดสะสม (Cumulative Cash Flow)",
                    data: cumulativeData,
                    borderColor: "#f59e0b",
                    backgroundColor: "rgba(245, 158, 11, 0.15)",
                    fill: true,
                    tension: 0.35,
                    borderWidth: 3,
                    pointRadius: 3,
                    pointHoverRadius: 6,
                    pointBackgroundColor: "#f59e0b"
                },
                {
                    label: "เส้นจุดคุ้มทุน (Break-even Level)",
                    data: zeroLine,
                    borderColor: isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)",
                    borderDash: [6, 6],
                    borderWidth: 1.5,
                    pointRadius: 0,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: "index",
                intersect: false
            },
            plugins: {
                legend: {
                    position: "top",
                    labels: {
                        color: textColor,
                        font: { family: "Prompt", size: 12 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || "";
                            if (label) label += ": ";
                            if (context.parsed.y !== null) {
                                label += formatMoney(context.parsed.y) + " บาท";
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: gridColor },
                    ticks: { color: textColor, font: { family: "Outfit", size: 11 } }
                },
                y: {
                    grid: { color: gridColor },
                    ticks: {
                        color: textColor,
                        font: { family: "Outfit", size: 11 },
                        callback: function(value) {
                            return formatMoney(value) + " บ.";
                        }
                    }
                }
            }
        }
    });
}

function updateChartTheme(theme) {
    if (!appState.roi.chartInstance) return;
    const isDark = theme === "dark";
    const gridColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)";
    const textColor = isDark ? "#94a3b8" : "#475569";

    appState.roi.chartInstance.options.scales.x.grid.color = gridColor;
    appState.roi.chartInstance.options.scales.x.ticks.color = textColor;
    appState.roi.chartInstance.options.scales.y.grid.color = gridColor;
    appState.roi.chartInstance.options.scales.y.ticks.color = textColor;
    appState.roi.chartInstance.options.plugins.legend.labels.color = textColor;
    appState.roi.chartInstance.update();
}
