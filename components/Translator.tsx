'use client';

import { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import TranslationService from '../services/translationService';

interface TranslatorProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Translator = ({ isOpen, onClose }: TranslatorProps = {}) => {
  const { language } = useAppContext();
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('tr');
  const [targetLang, setTargetLang] = useState('ms');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isListening, setIsListening] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'greetings' | 'food' | 'transport' | 'emergency'>('greetings');
  const [commonPhrases, setCommonPhrases] = useState<Array<{ original: string; translated: string }>>([]);

  const translationService = TranslationService.getInstance();
  const languages = translationService.getSupportedLanguages();

  // Çeviri yap
  const translateText = async () => {
    if (!sourceText.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const result = await translationService.translateText(sourceText, targetLang, sourceLang);
      setTranslatedText(result.translatedText);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Çeviri hatası');
    } finally {
      setLoading(false);
    }
  };

  // Dilleri değiştir
  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  // Sesli çeviri
  const startVoiceRecognition = async () => {
    if (isListening) return;
    
    setIsListening(true);
    setError('');
    
    try {
      const langCode = sourceLang === 'tr' ? 'tr-TR' : 
                      sourceLang === 'ms' ? 'ms-MY' :
                      sourceLang === 'id' ? 'id-ID' : 'en-US';
      
      const transcript = await translationService.startVoiceRecognition(langCode);
      setSourceText(transcript);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ses tanıma hatası');
    } finally {
      setIsListening(false);
    }
  };

  // Metni sesli oku
  const speakText = (text: string, lang: string) => {
    const langCode = lang === 'tr' ? 'tr-TR' : 
                    lang === 'ms' ? 'ms-MY' :
                    lang === 'id' ? 'id-ID' : 'en-US';
    translationService.speakText(text, langCode);
  };

  // Sık kullanılan ifadeleri çevir
  const translateCommonPhrases = async () => {
    setLoading(true);
    try {
      const phrases = translationService.getCommonPhrases(selectedCategory);
      const translated = await translationService.translatePhrases(phrases, targetLang, 'tr');
      setCommonPhrases(translated);
    } catch (err) {
      setError('İfadeler çevrilemedi');
    } finally {
      setLoading(false);
    }
  };

  // Auto translate when text changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (sourceText.trim()) {
        translateText();
      }
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [sourceText, sourceLang, targetLang]);

  // Load common phrases on category change
  useEffect(() => {
    if (isOpen) {
      translateCommonPhrases();
    }
  }, [selectedCategory, targetLang, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            🌐 {language === 'tr' ? 'Çeviri' : 'Translator'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <span className="text-xl">✕</span>
          </button>
        </div>

        {/* Language Selectors */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              {language === 'tr' ? 'Kaynak Dil' : 'Source Language'}
            </label>
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              {language === 'tr' ? 'Hedef Dil' : 'Target Language'}
            </label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={swapLanguages}
            className="p-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 rounded-lg transition-colors"
            title={language === 'tr' ? 'Dilleri Değiştir' : 'Swap Languages'}
          >
            <span className="text-xl">🔄</span>
          </button>
        </div>

        {/* Text Translation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {language === 'tr' ? 'Metni Girin' : 'Enter Text'}
              </label>
              <button
                onClick={startVoiceRecognition}
                disabled={isListening}
                className={`p-2 rounded-lg transition-colors ${
                  isListening 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300'
                }`}
                title={language === 'tr' ? 'Sesli Giriş' : 'Voice Input'}
              >
                🎤
              </button>
            </div>
            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder={language === 'tr' ? 'Çevrilecek metni yazın...' : 'Type text to translate...'}
              className="w-full h-32 p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none"
            />
            {sourceText && (
              <button
                onClick={() => speakText(sourceText, sourceLang)}
                className="mt-2 p-2 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 rounded-lg transition-colors"
                title={language === 'tr' ? 'Sesli Oku' : 'Speak'}
              >
                🔊
              </button>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              {language === 'tr' ? 'Çeviri' : 'Translation'}
            </label>
            <div className="relative">
              <textarea
                value={translatedText}
                readOnly
                placeholder={language === 'tr' ? 'Çeviri burada görünecek...' : 'Translation will appear here...'}
                className="w-full h-32 p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-600 text-gray-900 dark:text-white resize-none"
              />
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-slate-800/80 rounded-lg">
                  <span className="text-blue-600 dark:text-blue-400">
                    {language === 'tr' ? 'Çeviriliyor... 🌐' : 'Translating... 🌐'}
                  </span>
                </div>
              )}
            </div>
            {translatedText && (
              <button
                onClick={() => speakText(translatedText, targetLang)}
                className="mt-2 p-2 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 rounded-lg transition-colors"
                title={language === 'tr' ? 'Sesli Oku' : 'Speak'}
              >
                🔊
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Common Phrases */}
        <div className="border-t border-gray-200 dark:border-slate-600 pt-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            💬 {language === 'tr' ? 'Sık Kullanılan İfadeler' : 'Common Phrases'}
          </h3>

          {/* Category Tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {(['greetings', 'food', 'transport', 'emergency'] as const).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
              >
                {category === 'greetings' && '👋'} 
                {category === 'food' && '🍽️'} 
                {category === 'transport' && '🚌'} 
                {category === 'emergency' && '🚨'} 
                {language === 'tr' ? (
                  category === 'greetings' ? 'Selamlaşma' :
                  category === 'food' ? 'Yemek' :
                  category === 'transport' ? 'Ulaşım' : 'Acil Durum'
                ) : (
                  category === 'greetings' ? 'Greetings' :
                  category === 'food' ? 'Food' :
                  category === 'transport' ? 'Transport' : 'Emergency'
                )}
              </button>
            ))}
          </div>

          {/* Phrases List */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {commonPhrases.map((phrase, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors cursor-pointer"
                onClick={() => {
                  setSourceText(phrase.original);
                  setTranslatedText(phrase.translated);
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {phrase.original}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {phrase.translated}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(phrase.original, 'tr');
                      }}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-slate-500 rounded"
                    >
                      🔊
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(phrase.translated, targetLang);
                      }}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-slate-500 rounded"
                    >
                      🎵
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};