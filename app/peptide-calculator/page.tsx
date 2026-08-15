"use client";

import { useState } from 'react';
import { AlertTriangle, Calculator as CalcIcon } from 'lucide-react';

export default function PeptideCalculator() {
  const [peptideAmount, setPeptideAmount] = useState<number | ''>(5); // mg
  const [waterVolume, setWaterVolume] = useState<number | ''>(2); // ml
  const [desiredDoseMg, setDesiredDoseMg] = useState<number | ''>(0.5); // mg

  const calculateResult = () => {
    if (!peptideAmount || !waterVolume || !desiredDoseMg) return null;
    
    // Concentration = mg / ml
    const concentration = peptideAmount / waterVolume;
    
    // Required Volume (ml) = Desired Dose (mg) / Concentration (mg/ml)
    const requiredVolumeMl = desiredDoseMg / concentration;
    
    // Convert to Units (assuming standard 1ml insulin syringe = 100 units)
    // 1 ml = 100 units, so ml * 100
    const requiredUnits = requiredVolumeMl * 100;

    return {
      concentration: concentration.toFixed(2),
      requiredVolumeMl: requiredVolumeMl.toFixed(4),
      requiredUnits: requiredUnits.toFixed(1)
    };
  };

  const result = calculateResult();

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-200 rounded-2xl mb-6">
            <CalcIcon className="w-8 h-8 text-slate-700" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Peptide Calculator</h1>
          <p className="text-lg text-slate-600">
            Mathematically calculate concentration and volume relationships for research peptides.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Peptide Amount (mg)</label>
                <input 
                  type="number" 
                  value={peptideAmount}
                  onChange={(e) => setPeptideAmount(Number(e.target.value) || '')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g. 5"
                />
                <p className="text-xs text-slate-500 mt-2">The total amount of peptide in the vial.</p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Diluent Volume (ml)</label>
                <input 
                  type="number" 
                  value={waterVolume}
                  onChange={(e) => setWaterVolume(Number(e.target.value) || '')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g. 2"
                />
                <p className="text-xs text-slate-500 mt-2">The amount of bacteriostatic water added.</p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Desired Target (mg)</label>
                <input 
                  type="number" 
                  value={desiredDoseMg}
                  onChange={(e) => setDesiredDoseMg(Number(e.target.value) || '')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g. 0.5"
                />
                <p className="text-xs text-slate-500 mt-2">The target amount for your research application.</p>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <CalcIcon className="w-48 h-48" />
              </div>
              <h3 className="text-slate-400 font-semibold mb-6 uppercase tracking-widest text-sm relative z-10">Mathematical Result</h3>
              
              {result ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                  <div>
                    <div className="text-4xl font-bold mb-2">{result.concentration} <span className="text-lg text-slate-400 font-normal">mg/ml</span></div>
                    <div className="text-sm text-slate-400">Concentration</div>
                  </div>
                  <div className="border-t md:border-t-0 md:border-l border-slate-700 pt-6 md:pt-0">
                    <div className="text-4xl font-bold text-emerald-400 mb-2">{result.requiredVolumeMl} <span className="text-lg text-emerald-600/50 font-normal">ml</span></div>
                    <div className="text-sm text-slate-400">Required Volume</div>
                  </div>
                  <div className="border-t md:border-t-0 md:border-l border-slate-700 pt-6 md:pt-0">
                    <div className="text-4xl font-bold text-emerald-400 mb-2">{result.requiredUnits} <span className="text-lg text-emerald-600/50 font-normal">Units</span></div>
                    <div className="text-sm text-slate-400">Syringe Units (U-100)</div>
                  </div>
                </div>
              ) : (
                <div className="text-xl text-slate-500 relative z-10 py-6">
                  Please enter all values to see the result.
                </div>
              )}
            </div>
            
            <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6 flex gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div className="text-sm text-amber-900 leading-relaxed">
                <strong>Disclaimer:</strong> This tool is a mathematical calculator only. This tool does not provide medical advice, prescribe treatment, or recommend an individual dose or treatment schedule. It simply performs basic division and multiplication based on your inputs.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
