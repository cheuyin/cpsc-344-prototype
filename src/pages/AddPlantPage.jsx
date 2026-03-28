import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const EMOJI_OPTIONS = ['🪴', '🌿', '🌱', '🍃', '🌵', '🌺', '🌻', '🌷', '🌳', '🍀'];

export default function AddPlantPage() {
  const navigate = useNavigate();
  const { addPlant } = useApp();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    nickname: '',
    species: '',
    emoji: '🪴',
    location: '',
    acquiredDate: '',
    notes: '',
    username: '',
    bio: '',
    isPublic: true,
  });

  const updateField = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canProceed =
    step === 1 ? form.nickname.trim() && form.species.trim() : true;

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      const newId = addPlant(form);
      navigate(`/profile/plant/${newId}/schedule`);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 shrink-0">
        <button
          onClick={() => (step === 2 ? setStep(1) : navigate('/profile'))}
          className="text-green-600 -ml-1"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-sm font-semibold text-gray-800 flex-1">
          {step === 1 ? 'Add New Plant' : 'Plant Account'}
        </h1>
        <div className="flex gap-1">
          <div
            className={`w-2 h-2 rounded-full ${
              step === 1 ? 'bg-green-500' : 'bg-gray-300'
            }`}
          />
          <div
            className={`w-2 h-2 rounded-full ${
              step === 2 ? 'bg-green-500' : 'bg-gray-300'
            }`}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {step === 1 ? (
          <div className="px-4 py-4">
            {/* Photo upload */}
            <div className="flex justify-center mb-5">
              <button className="w-24 h-24 rounded-2xl bg-green-50 border-2 border-dashed border-green-300 flex flex-col items-center justify-center gap-1 text-green-500 hover:bg-green-100 transition-colors">
                <Camera size={24} />
                <span className="text-[10px] font-medium">Add Photo</span>
              </button>
            </div>

            {/* Emoji picker */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                Choose an icon
              </label>
              <div className="flex gap-2 flex-wrap">
                {EMOJI_OPTIONS.map((e) => (
                  <button
                    key={e}
                    onClick={() => updateField('emoji', e)}
                    className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${
                      form.emoji === e
                        ? 'bg-green-100 ring-2 ring-green-500 scale-110'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            {/* Form fields */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">
                  Nickname *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Monty"
                  value={form.nickname}
                  onChange={(e) => updateField('nickname', e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">
                  Species *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Monstera Deliciosa"
                  value={form.species}
                  onChange={(e) => updateField('species', e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Living Room"
                  value={form.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">
                  Date acquired
                </label>
                <input
                  type="date"
                  value={form.acquiredDate}
                  onChange={(e) => updateField('acquiredDate', e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">
                  Notes
                </label>
                <textarea
                  placeholder="Anything to remember about this plant..."
                  value={form.notes}
                  onChange={(e) => updateField('notes', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="px-4 py-4">
            {/* Preview card */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-5 flex items-center gap-3">
              <div className="text-3xl">{form.emoji}</div>
              <div>
                <div className="text-sm font-bold text-gray-800">
                  {form.nickname}
                </div>
                <div className="text-xs text-gray-400">{form.species}</div>
              </div>
            </div>

            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Plant Account Details
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">
                  Username
                </label>
                <div className="flex items-center">
                  <span className="text-sm text-gray-400 mr-1">@</span>
                  <input
                    type="text"
                    placeholder={form.nickname.toLowerCase().replace(/\s/g, '') || 'plantname'}
                    value={form.username}
                    onChange={(e) => updateField('username', e.target.value)}
                    className="flex-1 px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">
                  Bio
                </label>
                <textarea
                  placeholder="Tell others about this plant..."
                  value={form.bio}
                  onChange={(e) => updateField('bio', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent resize-none"
                />
              </div>

              {/* Visibility toggle */}
              <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-3 py-3">
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    Public profile
                  </div>
                  <div className="text-[10px] text-gray-400">
                    Others can discover and follow this plant
                  </div>
                </div>
                <button
                  onClick={() => updateField('isPublic', !form.isPublic)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    form.isPublic ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow transition-transform ${
                      form.isPublic ? 'translate-x-5.5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Set up schedule prompt */}
            <div className="mt-5 bg-green-50 border border-green-100 rounded-xl p-3.5">
              <div className="flex items-center gap-2">
                <span className="text-lg">📅</span>
                <div>
                  <div className="text-xs font-semibold text-green-800">
                    Set up a care schedule next
                  </div>
                  <div className="text-[10px] text-green-600">
                    You'll be able to create recurring reminders for watering,
                    fertilizing, and more
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom action */}
      <div className="px-4 py-3 bg-white border-t border-gray-100 shrink-0">
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={`w-full py-3 rounded-2xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
            canProceed
              ? 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {step === 1 ? (
            <>
              Next: Set Up Account
              <ChevronRight size={16} />
            </>
          ) : (
            <>
              Create Plant & Set Schedule
              <ChevronRight size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
