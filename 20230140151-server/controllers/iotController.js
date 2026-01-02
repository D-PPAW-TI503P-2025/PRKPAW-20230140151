const { SensorLog } = require('../models');

exports.receiveSensorData = async (req, res) => {
  try {
    const { suhu, kelembaban, cahaya } = req.body;

    // Validasi
    if (suhu === undefined || kelembaban === undefined) {
      return res.status(400).json({
        status: "error",
        message: "Data tidak valid"
      });
    }

    // Simpan ke database
    await SensorLog.create({
      suhu: parseFloat(suhu),
      kelembaban: parseFloat(kelembaban),
      cahaya: parseInt(cahaya) || 0
    });

    console.log(`💾 [SAVED] Suhu: ${suhu} | Lembab: ${kelembaban} | Cahaya: ${cahaya}`);

    res.status(201).json({ status: "ok" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
