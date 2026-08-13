// 1. ฐานข้อมูลอัตราค่าเช่า (Rental Rates)
const rentalRates = {
  "A": {
    "3-10":    {"day1": 170,  "day2": 130,  "day3_plus": 100},
    "25-28":   {"day1": 490,  "day2": 370,  "day3_plus": 300},
    "56-60":   {"day1": 1200, "day2": 850,  "day3_plus": 680},
    "120-128": {"day1": 2000, "day2": 1500, "day3_plus": 1200},
    "300-335": {"day1": 4600, "day2": 3500, "day3_plus": 2800},
    "500":     {"day1": 7100, "day2": 5400, "day3_plus": 4300},
    ">500":    {"day1": 12500,"day2": 9300, "day3_plus": 7500}
  },
  "B": {
    "3-10":    {"day1": 250,  "day2": 190,  "day3_plus": 150},
    "25-28":   {"day1": 730,  "day2": 550,  "day3_plus": 440},
    "56-60":   {"day1": 1700, "day2": 1300, "day3_plus": 1000},
    "120-128": {"day1": 3000, "day2": 2300, "day3_plus": 1800},
    "300-335": {"day1": 6800, "day2": 5200, "day3_plus": 4200},
    "500":     {"day1": 10600,"day2": 8100, "day3_plus": 6500},
    ">500":    {"day1": 18400,"day2": 14000,"day3_plus": 11200}
  }
};

// 2. ฐานข้อมูลค่าควบคุมงาน (Control Staff Rates)
const controlRates = {
  "3-15":   {"staff_by_machine": [1, 1, 2, 2], "rate_per_man_day": 500},
  "16-28":  {"staff_by_machine": [1, 2, 2, 3], "rate_per_man_day": 1600},
  "29-128": {"staff_by_machine": [1, 2, 2, 3], "rate_per_man_day": 1600},
  "300+":   {"staff_by_machine": [2, 3, 4, 5], "rate_per_man_day": 1600}
};

// 3. ฐานข้อมูลค่าขนส่ง (Transport Rates)
const transportRates = {
  "1-50":   {"truck_300-499": 1000, "truck_500+": 1200, "trailer_3-15": 0, "trailer_16-55": 500,  "trailer_56-119": 800,  "trailer_120-128": 1000},
  "51-100": {"truck_300-499": 1500, "truck_500+": 1800, "trailer_3-15": 0, "trailer_16-55": 650,  "trailer_56-119": 1100, "trailer_120-128": 1500},
  "101-150":{"truck_300-499": 2000, "truck_500+": 2400, "trailer_3-15": 0, "trailer_16-55": 800,  "trailer_56-119": 1400, "trailer_120-128": 2000},
  "151+":   {"truck_300-499": 2500, "truck_500+": 3000, "trailer_3-15": 0, "trailer_16-55": 1000, "trailer_56-119": 1600, "trailer_120-128": 2500}
};

// ฟังก์ชันหาช่วงขนาดค่าควบคุมงาน (Control Key Mapping)
function getControlRangeKey(sizeRange) {
  switch (sizeRange) {
    case "3-10":
      return "3-15";
    case "25-28":
      return "16-28";
    case "56-60":
    case "120-128":
      return "29-128";
    case "300-335":
    case "500":
    case ">500":
      return "300+";
    default:
      return "3-15";
  }
}

// ฟังก์ชันหาคอลัมน์ค่าจัดส่ง (Transport Key Mapping)
function getTransportColumnKey(sizeRange) {
  switch (sizeRange) {
    case "3-10":
      return "trailer_3-15";
    case "25-28":
      return "trailer_16-55";
    case "56-60":
      return "trailer_56-119";
    case "120-128":
      return "trailer_120-128";
    case "300-335":
      return "truck_300-499";
    case "500":
    case ">500":
      return "truck_500+";
    default:
      return "trailer_3-15";
  }
}

// คำนวณค่าเช่าเครื่องกำเนิดไฟฟ้าต่อเครื่อง
function calculateRentalFee(customerType, sizeRange, totalDays) {
  const rates = rentalRates[customerType]?.[sizeRange];
  if (!rates || totalDays <= 0) return 0;

  let totalFee = 0;
  if (totalDays >= 1) {
    totalFee += rates.day1;
  }
  if (totalDays >= 2) {
    totalFee += rates.day2;
  }
  if (totalDays > 2) {
    const remainingDays = totalDays - 2;
    totalFee += remainingDays * rates.day3_plus;
  }
  return totalFee;
}

// ฟังก์ชันแปลงค่าเงินตัวเลขเป็นตัวอักษรไทย (Thai Baht Text)
function ThaiBaht(Number) {
  if (isNaN(Number)) return "";
  Number = Math.round(Number * 100) / 100;
  const numStr = Number.toString().split('.');
  let baht = numStr[0];
  let satang = numStr[1] ? numStr[1] : "";
  
  if (satang.length === 1) satang += "0";
  
  let result = "";
  if (parseFloat(Number) === 0) {
    return "ศูนย์บาทถ้วน";
  }
  
  result += NumberToThaiText(baht) + "บาท";
  if (satang === "" || satang === "00") {
    result += "ถ้วน";
  } else {
    result += NumberToThaiText(satang) + "สตางค์";
  }
  return result;
}

function NumberToThaiText(NumberString) {
  const thaiNumbers = ["ศูนย์", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า"];
  const thaiPositions = ["", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน", "ล้าน"];
  let text = "";
  const len = NumberString.length;
  
  for (let i = 0; i < len; i++) {
    const digit = parseInt(NumberString.charAt(i));
    const position = len - 1 - i;
    
    if (digit !== 0) {
      if (position === 1 && digit === 1) {
        text += "สิบ";
      } else if (position === 1 && digit === 2) {
        text += "ยี่สิบ";
      } else if (position === 0 && digit === 1 && len > 1 && parseInt(NumberString.charAt(i - 1)) !== 0) {
        text += "เอ็ด";
      } else {
        text += thaiNumbers[digit] + thaiPositions[position % 6];
      }
    }
    
    if (position >= 6 && position % 6 === 0) {
      text += "ล้าน";
    }
  }
  return text;
}

// ฟังก์ชันคำนวณทั้งหมด
function calculateTotalExpenses(regulationType, customerType, sizeRange, totalDays, numMachines, distanceRange) {
  // 1. ค่าเช่ารวม
  let rentalFeePerMachine = 0;
  let totalRentalFee = 0;
  
  if (regulationType === 'rental_reg') {
    rentalFeePerMachine = calculateRentalFee(customerType, sizeRange, totalDays);
    totalRentalFee = rentalFeePerMachine * numMachines;
  }

  // 2. ค่าควบคุมงาน
  const controlKey = getControlRangeKey(sizeRange);
  const controlData = controlRates[controlKey];
  // หาดัชนีของอาเรย์ตามจำนวนเครื่องเช่า (สูงสุดไม่เกิน 4 เครื่องตามเงื่อนไขของตาราง)
  const machineIndex = Math.min(numMachines, 4) - 1;
  const numStaff = controlData.staff_by_machine[machineIndex];
  const totalControlFee = numStaff * controlData.rate_per_man_day * totalDays;

  // 3. ค่าจัดส่งและขนส่ง
  const transportKey = getTransportColumnKey(sizeRange);
  const shippingRatePerMachine = transportRates[distanceRange][transportKey];
  const totalShippingFee = shippingRatePerMachine * numMachines;

  // ผลรวมทั้งหมด
  const grandTotal = totalRentalFee + totalControlFee + totalShippingFee;

  return {
    rentalFeePerMachine,
    totalRentalFee,
    numStaff,
    ratePerManDay: controlData.rate_per_man_day,
    totalControlFee,
    shippingRatePerMachine,
    totalShippingFee,
    grandTotal
  };
}

// รูปแบบแสดงเงินสกุลบาท (ใส่เครื่องหมายคอมมา)
function formatCurrency(number) {
  return number.toLocaleString('th-TH');
}

// อัปเดตการสรุปผลบนหน้าจอ UI
function updateUI() {
  const form = document.getElementById('calculator-form');
  const regulationType = form.elements['regulation_type'].value;
  const customerType = form.elements['customer_type'].value;
  const sizeRange = form.elements['size_range'].value;
  const numMachines = parseInt(form.elements['num_machines'].value) || 1;
  const totalDays = parseInt(form.elements['total_days'].value) || 1;
  const distanceRange = form.elements['distance_range'].value;

  const result = calculateTotalExpenses(regulationType, customerType, sizeRange, totalDays, numMachines, distanceRange);

  // อัปเดตยอดรวมสุทธิและภาษีมูลค่าเพิ่ม
  const vatAmount = result.grandTotal * 0.07;
  const totalWithVat = result.grandTotal + vatAmount;

  document.getElementById('grand-total').textContent = formatCurrency(result.grandTotal);
  document.getElementById('vat-amount').textContent = formatCurrency(vatAmount);
  document.getElementById('total-with-vat').textContent = formatCurrency(totalWithVat);
  document.getElementById('total-baht-text').textContent = `(${ThaiBaht(totalWithVat)})`;

  // อัปเดตรายละเอียดค่าเช่าเครื่องยนต์
  const rentalBreakdownItem = document.getElementById('rental-breakdown-item');
  if (regulationType === 'generator_set_reg') {
    rentalBreakdownItem.style.opacity = '0.65';
    document.getElementById('rental-detail-text').innerHTML = `
      ขนาด <strong>${sizeRange} kW</strong><br>
      <span style="color: var(--accent-amber); font-weight: 500;"><i class="fa-solid fa-circle-check"></i> ได้รับการยกเว้นค่าเช่าตามระเบียบการนำชุดเครื่องกำเนิดไฟฟ้า</span>
    `;
    document.getElementById('rental-total-fee').textContent = `0 บาท`;
  } else {
    rentalBreakdownItem.style.opacity = '1';
    const customerTypeText = customerType === 'A' ? 'ประเภท ก (หน่วยงานภายใน)' : 'ประเภท ข (ทั่วไป)';
    document.getElementById('rental-detail-text').innerHTML = `
      ขนาด <strong>${sizeRange} kW</strong> (${customerTypeText})<br>
      จำนวน <strong>${numMachines} เครื่อง</strong> &times; ${totalDays} วัน (เครื่องละ ${formatCurrency(result.rentalFeePerMachine)} บาท)
    `;
    document.getElementById('rental-total-fee').textContent = `${formatCurrency(result.totalRentalFee)} บาท`;
  }

  // อัปเดตรายละเอียดพนักงานควบคุมงาน
  const controlKey = getControlRangeKey(sizeRange);
  document.getElementById('staff-detail-text').innerHTML = `
    ช่วงกำลังไฟ <strong>${controlKey} kW</strong> ใช้พนักงานดูแล <strong>${result.numStaff} คน</strong>ต่อวัน<br>
    อัตราคนละ ${formatCurrency(result.ratePerManDay)} บาท/วัน &times; ${totalDays} วัน
  `;
  document.getElementById('staff-total-fee').textContent = `${formatCurrency(result.totalControlFee)} บาท`;

  // อัปเดตรายละเอียดค่าขนส่ง
  const transportKey = getTransportColumnKey(sizeRange);
  let transportMethod = '';
  if (transportKey.startsWith('trailer')) {
    transportMethod = transportKey === 'trailer_3-15' 
      ? 'ผู้เช่ารับ-ส่งคืนเอง ณ การไฟฟ้าฯ' 
      : `ลากจูง (Trailer) ขนาด ${transportKey.replace('trailer_', '')} kW`;
  } else {
    transportMethod = `ติดตั้งบนรถยนต์ (Truck) ขนาด ${transportKey.replace('truck_', '')} kW`;
  }

  document.getElementById('transport-detail-text').innerHTML = `
    ระยะจัดส่ง <strong>${distanceRange} กม.</strong> (${transportMethod})<br>
    อัตราเครื่องละ ${formatCurrency(result.shippingRatePerMachine)} บาท &times; ${numMachines} เครื่อง
  `;
  document.getElementById('transport-total-fee').textContent = `${formatCurrency(result.totalShippingFee)} บาท`;
}

// จัดการปุ่มกดเพิ่ม/ลดจำนวนแบบ Stepper
function stepInput(inputId, direction) {
  const input = document.getElementById(inputId);
  const min = parseInt(input.getAttribute('min')) || 1;
  const max = parseInt(input.getAttribute('max')) || 999;
  let val = parseInt(input.value) || min;
  
  val += direction;
  if (val < min) val = min;
  if (val > max) val = max;
  
  input.value = val;
  updateUI();
}

// ตรวจสอบการป้อนข้อมูลและเพิ่ม Event Listeners ทันทีหลังจากโหลดหน้าเว็บสำเร็จ
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('calculator-form');
  
  // เพิ่ม event listener ให้กับทุกอินพุตในฟอร์มเพื่ออัปเดตแบบเรียลไทม์
  form.addEventListener('input', updateUI);
  form.addEventListener('change', updateUI);

  // จัดการการเปลี่ยนธีม (Light/Dark Mode)
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    themeToggle.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // คำนวณครั้งแรกเมื่อเปิดหน้าเว็บ
  updateUI();
});
